import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebaseConfig";
import {
  Timestamp,
  collection,
  getCountFromServer,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { useFirebaseAuth } from "../firebase/FirebaseAuth";

interface CalculationListProps {
  listSource: "user" | "everyone";
  pagination?: boolean;
}

interface Calculation {
  value1: number;
  value2: number;
  operator: string;
  result: number;
  date: Timestamp;
  name: string;
}

const CalculationList = ({ listSource, pagination }: CalculationListProps) => {
  const { user } = useFirebaseAuth();
  const [calculations, setCalculations] = useState<Calculation[]>([]);
  const [documentCount, setDocumentCount] = useState(0);
  const [lastVisibleDoc, setLastVisibleDoc] = useState<any>();

  const defineCollectionRef = (listSource: string) => {
    if (listSource === "user" && user) {
      return collection(firestore, "users", user?.uid, "calculations");
    }

    return collection(firestore, "communication");
  };

  useEffect(() => {
    const userDocRef = defineCollectionRef(listSource);

    if (pagination) {
      getCountFromServer(userDocRef).then((countDoc) => {
        const count = countDoc.data()?.count || 0;
        setDocumentCount(count);
      });
    }

    if (listSource === "everyone") {
      getData();
    } else if (listSource == "user" && user) {
      const q = defineQuery();
      onSnapshot(q, (querySnapshot) => {
        const calculationsData = querySnapshot.docs.map(
          (doc) => doc.data() as Calculation
        );
        setCalculations(calculationsData);
      });
    }
  }, [user, listSource, pagination]);

  const defineOperator = (operator: string) => {
    switch (operator) {
      case "add":
        return "+";
      case "subtract":
        return "-";
      case "multiply":
        return "*";
      case "divide":
        return "/";
      default:
        return "";
    }
  };

  const generateCalculationString = (calculation: Calculation) => {
    return `${calculation.value1} ${defineOperator(calculation.operator)} ${
      calculation.value2
    } = ${calculation.result}`;
  };

  const formatDate = (timestamp: Timestamp) => {
    return new Date(timestamp.seconds * 1000).toLocaleString();
  };

  const defineQuery = () => {
    const userDocRef = defineCollectionRef(listSource);

    const q = query(userDocRef, limit(10), orderBy("date", "desc"));

    if (listSource === "everyone" && lastVisibleDoc) {
      return query(q, startAfter(lastVisibleDoc));
    }

    return q;
  };

  const getData = async () => {
    const q = defineQuery();

    const docs = await getDocs(q);
    const calculationsData = docs.docs.map((doc) => doc.data() as Calculation);

    setCalculations([...calculations, ...calculationsData]);
    const lastDoc = docs.docs[docs.docs.length - 1];
    if (lastDoc) {
      setLastVisibleDoc(lastDoc);
    }
  };

  return (
    <>
      {calculations.length === 0 && (
        <p className="text-center text-gray-500 my-16">No calculations yet</p>
      )}
      <ul role="list" className="divide-y divide-gray-100">
        {calculations.map((calculation: Calculation, index: number) => (
          <li key={index} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto items-start flex flex-col">
                {listSource === "everyone" && (
                  <p className="text-sm font-semibold leading-6">
                    {calculation.name}
                  </p>
                )}
                <p className="text-sm font-semibold leading-6">
                  {generateCalculationString(calculation)}
                </p>
              </div>
            </div>
            <div className="shrink-0 sm:flex sm:flex-col sm:items-end justify-end">
              <p className="text-sm leading-6">
                {formatDate(calculation.date)}
              </p>
            </div>
          </li>
        ))}
      </ul>
      {listSource === "everyone" && calculations.length > 0 && (
        <p className="text-center text-gray-500 my-16">
          {calculations.length} of {documentCount}
        </p>
      )}
      {pagination && documentCount > calculations.length && calculations.length > 0 && (
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0"
          onClick={() => {
            getData();
          }}
        >
          Load more
        </button>
      )}
    </>
  );
};

export default CalculationList;

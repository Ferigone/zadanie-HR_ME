import { useTheme } from "../ThemeContext";

const DarkModeSwitch = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <label className="flex items-center cursor-pointer mx-6">
      <span className="mr-2 text-white">{darkMode ? "Light" : "Dark"} Mode</span>
      <input
        type="checkbox"
        className="hidden"
        onChange={toggleDarkMode}
        checked={darkMode}
      />
      <span
        className={`bg-gray-300 w-12 h-6 rounded-full ${
          darkMode ? "bg-yellow-500" : "bg-gray-400"
        }`}
      >
        <span
          className={`block w-6 h-6 rounded-full transform transition-transform ${
            darkMode ? "translate-x-6" : ""
          } bg-white`}
        />
      </span>
    </label>
  );
}

export default DarkModeSwitch;

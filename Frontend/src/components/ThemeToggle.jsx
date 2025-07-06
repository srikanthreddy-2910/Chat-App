// components/ThemeToggle.jsx
import { useThemeStore } from "../store/useThemeStore";

const ThemeToggle = () => {
  const { theme, setTheme } = useThemeStore();

  const handleToggle = () => {
    const newTheme = theme === "light" ? "retro" : "light";
    setTheme(newTheme);
  };

  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <span className="text-sm">Light</span>
      <input
        type="checkbox"
        className="toggle toggle-primary"
        checked={theme === "retro"}
        onChange={handleToggle}
      />
      <span className="text-sm">Retro</span>
    </label>
  );
};

export default ThemeToggle;

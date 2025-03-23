import React from "react";

const CustomCheckbox = ({ filterType, option, isChecked, onChange }) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        name={filterType}
        value={option.value}
        checked={isChecked}
        onChange={onChange}
        className="hidden"
      />
      <div
        className="w-5 h-5 rounded border border-gray-600 flex items-center justify-center"
        style={{ backgroundColor: isChecked ? "#9c27b0" : "transparent" }}
      >
        {isChecked && <i className="fas fa-check text-white"></i>}
      </div>
      <span>{option.label}</span>
    </label>
  );
};

export default CustomCheckbox;

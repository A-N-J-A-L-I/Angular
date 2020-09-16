class HousePriorityListItem {
  label: string;
  key: string;
  isSelected = false;
  isChecked = false;
}

class HousePriorityCategory {
  label: string;
  key: string;
  list: HousePriorityListItem[];
}

export {
  HousePriorityCategory, HousePriorityListItem
};

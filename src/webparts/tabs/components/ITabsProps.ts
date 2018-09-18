import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { IItem, IRenderedListFromSite } from "../TabsWebPart";

export interface IListViewProps {
  description: string;
  dropdownField0: string;
  dropdownField1: string;
  dropdownField2: string;
  dropdownField3: string;
  dropdownField4: string;
  renderedListsFromSite: IRenderedListFromSite[];
  columns: IColumn[];
  items0: IItem[];
  items1: IItem[];
  items2: IItem[];
  items3: IItem[];
  items4: IItem[];
  // tabs: ITab[];
}
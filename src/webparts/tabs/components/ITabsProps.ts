import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { IItem } from "../TabsWebPart";

export interface IListViewProps {
  description: string;
  dropdownField: string;
  columns: IColumn[];
  items: IItem[];
}

import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { IItem, IRenderedListFromSite } from "../TabsWebPart";

export interface IListViewProps {
  description: string;
  dropdownField: string;
  renderedListsFromSite: IRenderedListFromSite[];
  columns: IColumn[];
  items: IItem[];
 // tabs: ITab[];
}
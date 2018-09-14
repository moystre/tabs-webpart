import { Environment, EnvironmentType, Version } from '@microsoft/sp-core-library';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { BaseClientSideWebPart, IPropertyPaneConfiguration, PropertyPaneDropdown } from '@microsoft/sp-webpart-base';
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as strings from 'TabsWebPartStrings';
import { IListViewProps } from './components/ITabsProps';
import ListView from './components/Tabs';

export interface ISPLists {
  value: ISPList[];
}

export interface ISPList {
  Id: number;
  Title: string;
  Created: Date;
  wpSite: string;
  wpDescription: string;
  wpBusinessModule: string;
  AuthorId: number;
}

export interface IListViewWebPartProps {
  description: string;
  dropdownField0: string;
  dropdownField1: string;
  dropdownField2: string;
  dropdownField3: string;
}

export interface IListsFromSite {
  value: IListFromSiteAsItem[];
}

export interface IListFromSiteAsItem {
  [key: string]: any;
  Id: string;
  Title: string;
  Description: string;
}

export interface IRenderedListFromSite {
  [key: string]: any;
  listId: string;
  listTitle: string;
  listDescription: string;
}

export interface IDropDownLists {
  value: IDropDownList[];
}

export interface IDropDownList {
  key: string;
  text: string;
}

export interface IItems {
  value: IItem[];
}

export interface IItem {
  [key: string]: any;
  Id: number;
  title: string;
  created: Date;
  site: string;
  description: string;
  businessModule: string;
  authorId: number;
}

export interface IColumn {
  key: string;
  name: string;
  fieldName: string;
  minWidth: number;
  isResizable: boolean;
  calculatedWidth: any;
}

export interface ITab {
  tabIndex: number;
  list: IRenderedListFromSite;
}

export default class ListViewWebPart extends BaseClientSideWebPart<IListViewWebPartProps> {
  public renListsFromSite: IRenderedListFromSite[];
  public dropDownList: IDropDownList[];
  public dropDownfieldName0: string = '';
  public dropDownfieldName1: string = '';
  public dropDownfieldName2: string = '';
  public dropDownfieldName3: string = '';
  public columns: IColumn[];
  // public items: IItems;
  public items0: IItem[];
  public items1: IItem[];
  public items2: IItem[];
  public items3: IItem[];
  public tabs: ITab[];

  constructor() {
    super();
    this.columns = [{
      key: 'column0',
      name: 'Id',
      fieldName: 'Id',
      minWidth: 30,
      maxWidth: 30,
      isResizable: true
    },
    {
      key: 'column1',
      name: 'Title',
      fieldName: 'title',
      minWidth: 150,
      maxWidth: 200,
      isResizable: true
    },
    {
      key: 'column2',
      name: 'Created',
      fieldName: 'created',
      minWidth: 150,
      maxWidth: 150,
      isResizable: true
    },
    {
      key: 'column3',
      name: 'Site',
      fieldName: 'site',
      minWidth: 150,
      maxWidth: 150,
      isResizable: true
    },
    {
      key: 'column4',
      name: 'AuthorId',
      fieldName: 'authorId',
      minWidth: 50,
      maxWidth: 50,
      isResizable: true
    }]
  }

  protected async onInit(): Promise<void> {
    this.renListsFromSite = await this.getRenderedListOfLists();
    while (this.renListsFromSite == null) {
      /* if(!this.isGetItemsFinished) {} */
    }
    this.dropDownList = await this.getSelectionList();
    this.items0, this.items1, this.items2, this.items3 = null;
    this.items0 = await this.getItems(this.properties.dropdownField0);
    this.items1 = await this.getItems(this.properties.dropdownField1);
    this.items2 = await this.getItems(this.properties.dropdownField2);
    this.items3 = await this.getItems(this.properties.dropdownField3);
    console.log(this.items0);
    this.dropDownfieldName0 = this.getListNameByKey(this.properties.dropdownField0);
    this.dropDownfieldName1 = this.getListNameByKey(this.properties.dropdownField1);
    this.dropDownfieldName2 = this.getListNameByKey(this.properties.dropdownField2);
    this.dropDownfieldName3 = this.getListNameByKey(this.properties.dropdownField3);
    // console.log(this.dropDownfieldName);
    await this.refreshItems();
    // this.tabs = [];
  }

  public render(): void {
    const element: React.ReactElement<IListViewProps> = React.createElement(
      ListView,
      {
        description: this.properties.description,
        dropdownField0: this.dropDownfieldName0,
        dropdownField1: this.dropDownfieldName1,
        dropdownField2: this.dropDownfieldName2,
        dropdownField3: this.dropDownfieldName3,
        renderedListsFromSite: this.renListsFromSite,
        columns: this.columns,
        items0: this.items0,
        items1: this.items1,
        items2: this.items2,
        items3: this.items3
        // tabs: this.tabs
      }
    );
    ReactDom.render(element, this.domElement);
  }

  private async refreshItems(): Promise<IItem[]> {
    return this.items0 = await this.getItems(this.properties.dropdownField0);
  }

  private async getSelectionList(): Promise<IDropDownList[]> {
    var selectionList: IDropDownList[]
    let i: number = 0;
    var list: {
      key: string,
      text: string
    }[] = [];
    this.renListsFromSite.forEach((element: IRenderedListFromSite) => {
      list.push({
        key: i.toString(),
        text: element.listTitle
      })
      i = i + 1;
    });
    selectionList = list;
    return selectionList;
  }

  private async getRenderedListOfLists(): Promise<IRenderedListFromSite[]> {
    var renderedListsFromSite: IRenderedListFromSite[];
    if (Environment.type === EnvironmentType.Local) {
      console.log('Local environment');
      return null;
    }
    else if (Environment.type == EnvironmentType.SharePoint ||
      Environment.type == EnvironmentType.ClassicSharePoint) {
      try {
        let container = null;
        var list: {
          listId: string;
          listTitle: string;
          listDescription: string;
        }[] = [];
        container = await this._getListsFromSite();
        container.value.forEach((item: IListFromSiteAsItem) => {
          //console.log(item);
          list.push({
            listId: item.Id,
            listTitle: item.Title,
            listDescription: item.Description
          })
        });
        renderedListsFromSite = list;
      }
      catch (exception) {
        console.warn(exception);
      }
      return renderedListsFromSite;
    }
  }

  private _getListsFromSite = async (): Promise<IListsFromSite> => {
    let listsFromSite: IListsFromSite = null;
    try {
      const response: SPHttpClientResponse = await this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl
        + `/_api/web/lists?$filter=Hidden eq false`,
        // + `/_api/web/lists/GetByTitle('Collaborators')/items`,
        SPHttpClient.configurations.v1);
      if (!response.ok) {
        throw "Could not fetch list data";
      }
      const lists: IListsFromSite = await response.json();
      listsFromSite = lists;
    } catch (exception) {
      console.warn(exception);
    }
    return listsFromSite;
  }

  public getListNameByKey(key: string): string {
    let _key: string = key;
    let _text: string = '';
    this.dropDownList.forEach(element => {
      if (element.key == _key) {
        _text = element.text;
      }
    });
    return _text;
  }

  private async getItems(dropdownField: string): Promise<IItem[]> {
    var _dropDownField = dropdownField;
    var renderedList: IItem[];
    if (Environment.type === EnvironmentType.Local) {
      console.log('Local environment');
      return null;
    }
    else if (Environment.type == EnvironmentType.SharePoint ||
      Environment.type == EnvironmentType.ClassicSharePoint) {
      try {
        let container = null;
        var list: {
          Id: number,
          title: string,
          created: Date
          site: string,
          description: string,
          businessModule: string,
          authorId: number
        }[] = [];
        if (_dropDownField == null) {
          _dropDownField = '1';
        } else {
          container = await this._getListData(this.getListNameByKey(_dropDownField));
        }
        container.value.forEach((item: ISPList) => {
          //  console.log(item);
          list.push({
            Id: item.Id,
            title: item.Title,
            created: item.Created,
            site: item.wpSite,
            description: item.wpDescription,
            businessModule: item.wpBusinessModule,
            authorId: item.AuthorId
          })
        });
        renderedList = list;
        // console.log(list);
      }
      catch (exception) {
        console.warn(exception);
      }
      return renderedList;
    }
  }

  private _getListData = async (listName: string): Promise<ISPLists> => {
    let returnLists: ISPLists = null;
    let _listName: string = listName;
    try {
      const response: SPHttpClientResponse = await this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl
        /*  + `/_api/web/lists?$filter=Hidden eq false`, */
        + `/_api/web/lists/GetByTitle('` + _listName + `')/items`,
        SPHttpClient.configurations.v1);
      if (!response.ok) {
        throw "Could not fetch list data";
      }
      const lists: ISPLists = await response.json();
      returnLists = lists;
    } catch (exception) {
      console.warn(exception);
    }
    return returnLists;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  public componentDidMount(): void {
  }

  public componentDidUpdate(): void {
  }

  protected async onPropertyPaneConfigurationStart(): Promise<void> {
    this.refreshItems();
    this.dropDownList = await this.getSelectionList();
  }

  protected async onPropertyPaneFieldChanged(): Promise<void> {
    await this.refreshItems();
    this.dropDownfieldName0 = this.dropDownList[this.properties.dropdownField0].text.toString();
    this.dropDownfieldName1 = this.dropDownList[this.properties.dropdownField1].text.toString();
    this.dropDownfieldName2 = this.dropDownList[this.properties.dropdownField2].text.toString();
    this.dropDownfieldName3 = this.dropDownList[this.properties.dropdownField3].text.toString();
    // console.log(this.dropDownfieldName0);
    this.render();
    return null;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneDropdown('dropdownField0', {
                  label: 'Tab 1:',
                  options: this.dropDownList
                }),
                PropertyPaneDropdown('dropdownField1', {
                  label: 'Tab 2:',
                  options: this.dropDownList
                }),
                PropertyPaneDropdown('dropdownField2', {
                  label: 'Tab 3:',
                  options: this.dropDownList
                }),
                PropertyPaneDropdown('dropdownField3', {
                  label: 'Tab 4:',
                  options: this.dropDownList
                })
              ]

            }
          ]
        }
      ]
    };
  }
}

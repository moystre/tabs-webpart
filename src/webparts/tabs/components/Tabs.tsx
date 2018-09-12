import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { CheckboxVisibility, DetailsList } from 'office-ui-fabric-react/lib/DetailsList';
import * as React from 'react';
import { IRenderedListFromSite, ITab } from '../TabsWebPart';
import { IListViewProps } from './ITabsProps';
import styles from './Tabs.module.scss';


export default class ListView extends React.Component<IListViewProps, {}> {
  public activeTab: number = 0;
  public amountOfTabs: number = 0;

  constructor(props) {
    super(props);
  }

  public handleTabSwitch(active) {
    this.activeTab = active;
  }

  public async addTab(): Promise<void> {
    if (this.amountOfTabs >= 4) {
      console.log('There can not be more than 4 tabs on this web part.');
    } else {
      var tabToAdd: ITab;
      let newTabIndex = this.amountOfTabs + 1;
      let newList = await this.props.renderedListsFromSite[this.amountOfTabs];
      var newTab: {
        tabIndex: number;
        list: IRenderedListFromSite;
      };
      newTab = {
        tabIndex: newTabIndex,
        list: newList
      }
      tabToAdd = newTab;
      console.log(this.props.tabs);
      this.props.tabs.push(tabToAdd);
      this.amountOfTabs = this.amountOfTabs +1;
    }
    return null;
  }
  public render(): React.ReactElement<IListViewProps> {
    return (

      <div className={styles.listView}>
        <span className={styles.title}>{this.props.dropdownField}</span>
        <div>
          <DefaultButton
            data-automation-id={1}
            text={"List_1       "}
          />
          <DefaultButton
            text={"-"}
          />&nbsp;
          <DefaultButton
            data-automation-id={1}
            text={"List_2       "}
          />
          <DefaultButton
            text={"-"}
          />&nbsp;
          <DefaultButton
            data-automation-id={1}
            text={"List_3       "}
          />
          <DefaultButton
            text={"-"}
          />&nbsp;
                    <DefaultButton
            data-automation-id={1}
            text={"List_4       "}
          />
          <DefaultButton
            text={"-"}
          />&nbsp;
            <PrimaryButton
            text={"+"}
            onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                this.addTab()
             }}
          />
        </div>
        <hr></hr>
        <DetailsList
          items={this.props.items}
          columns={this.props.columns}
          checkboxVisibility={CheckboxVisibility.onHover}
          compact={false}>
        </DetailsList>
        <br></br>
      </div>
    );
  }
}


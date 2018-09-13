import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { CheckboxVisibility, DetailsList } from 'office-ui-fabric-react/lib/DetailsList';
import * as React from 'react';
import { IRenderedListFromSite, ITab } from '../TabsWebPart';
import { IListViewProps } from './ITabsProps';
import styles from './Tabs.module.scss';

export interface IListViewState {
  tabs: ITab[];
  activeTab: number;
}

export default class ListView extends React.Component<IListViewProps, IListViewState> {
  public amountOfTabs: number = 0;

  constructor(props: IListViewProps) {
    super(props);
    this.state = {
      tabs: [],
      activeTab: 0
    };
  }

  public componentDidMount(): void {
    this.addTab();
  }

  public render(): React.ReactElement<IListViewProps> {
    console.log('rendered');
    return (
      <div className={styles.listView}>
        <span className={styles.title}>{this.props.dropdownField}</span>
        <br></br>
        <div className={styles.tabsRow}>
          {this.state.tabs[0] ?
            <div>
              <DefaultButton
                className={styles.listTab}
                text={this.state.tabs[0].list.listTitle}
                onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                  this.setActiveTab(0);
                }} />
              <DefaultButton
                className={styles.deleteTab}
                text={"-"} />&nbsp;
            </div>
            : null}

          {this.state.tabs[1] ?
            <div>
              <DefaultButton
                className={styles.listTab}
                text={this.state.tabs[1].list.listTitle}
                onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                  this.setActiveTab(1);
                }} />
              <DefaultButton
                className={styles.deleteTab}
                text={"-"} />&nbsp;
            </div>
            : null}

          {this.state.tabs[2] ?
            <div>
              <DefaultButton
                className={styles.listTab}
                text={this.state.tabs[2].list.listTitle}
                onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                  this.setActiveTab(2);
                }} />
              <DefaultButton
                className={styles.deleteTab}
                text={"-"} />&nbsp;
            </div>
            : null}

          {this.state.tabs[3] ?
            <div>
              <DefaultButton
                className={styles.listTab}
                text={this.state.tabs[3].list.listTitle}
                onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                  this.setActiveTab(3);
                }} />
              <DefaultButton
                className={styles.deleteTab}
                text={"-"} />&nbsp;
            </div>
            : null}

          <PrimaryButton
            className={styles.addTab}
            text={"+"}
            onClick={(event: React.MouseEvent<HTMLDivElement>) => {
              this.addTab();
            }} />
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
  
  public async setActiveTab(tab: number): Promise<void> {
    await this.setState({
      activeTab: tab
    })
    console.log('activeTab: ' + this.state.activeTab);
  }

  public async addTab(): Promise<void> {
    if (this.state.tabs.length >= 4) {
      console.log('There can not be more than 4 tabs on this web part.');
    } else {
      var tabToAdd: ITab;
      let newTabIndex = this.state.tabs.length + 1;
      let newList = await this.props.renderedListsFromSite[newTabIndex];
      var newTab: {
        tabIndex: number;
        list: IRenderedListFromSite;
      };
      newTab = {
        tabIndex: newTabIndex,
        list: newList
      }
      tabToAdd = newTab;
      var newTabs = this.state.tabs.concat(tabToAdd);
      this.setState({
        tabs: newTabs,
        activeTab: tabToAdd.tabIndex
      })
      console.log('tabs: ');
      console.log(this.state.tabs);
      this.render();
    }
    return null;
  }
  /*
    public populateTabs() {
      console.log('populateTabs: ');
      for (let tab in this.state.tabs) {
        console.log(this.state.tabs[tab].list.listTitle);
        return (
          <div>
            <DefaultButton
           
              text={"List "}
            />
            <DefaultButton
              text={"-"}
            />&nbsp;
          </div>
        )
      }
    }
  */
}


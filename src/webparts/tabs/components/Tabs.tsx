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
  public tabsToView: ITab[] = [];

  constructor(props: IListViewProps) {
    super(props);
    this.state = {
      tabs: [],
      activeTab: 0
    };
  }

  public async componentDidMount(): Promise<void> {
    await this.addTab();
    console.log(this.state.tabs);
  }

  public render(): React.ReactElement<IListViewProps> {
    console.log('rendered');
    return (
      <div className={styles.listView}>
        <div className={styles.tabsRow}>
          {this.state.tabs[0] ?
            <div>
              <DefaultButton
                className={this.state.activeTab == 0 ?
                  styles.listTabSelected : styles.listTab
                }
                text={this.props.dropdownField0}
                onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                  this.changeActiveTab(0);
                }} />
              <DefaultButton
                className={styles.deleteTab}
                text={'×'} />&nbsp;
            </div>
            : null}

          {this.state.tabs[1] ?
            <div>
              <DefaultButton
                className={this.state.activeTab == 1 ?
                  styles.listTabSelected : styles.listTab
                }
                text={this.props.dropdownField1}
                onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                  this.changeActiveTab(1);
                }} />
              <DefaultButton
                className={styles.deleteTab}
                text={'×'} />&nbsp;
            </div>
            : null}

          {this.state.tabs[2] ?
            <div>
              <DefaultButton
                className={this.state.activeTab == 2 ?
                  styles.listTabSelected : styles.listTab
                }
                text={this.props.dropdownField2}
                onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                  this.changeActiveTab(2);
                }} />
              <DefaultButton
                className={styles.deleteTab}
                text={'×'} />&nbsp;
            </div>
            : null}

          {this.state.tabs[3] ?
            <div>
              <DefaultButton
                className={this.state.activeTab == 3 ?
                  styles.listTabSelected : styles.listTab
                }
                text={this.props.dropdownField3}
                onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                  this.changeActiveTab(3);
                }} />
              <DefaultButton
                className={styles.deleteTab}
                text={'×'} />&nbsp;
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
        {
          this.state.tabs[0] && this.state.activeTab == 0 ?
            <DetailsList
              className={'DetailsList'}
              items={this.props.items0}
              columns={this.props.columns}
              checkboxVisibility={CheckboxVisibility.onHover}
              compact={false}>
            </DetailsList> :

            this.state.tabs[1] && this.state.activeTab == 1 ?
              <DetailsList
                className={'DetailsList'}
                items={this.props.items1}
                columns={this.props.columns}
                checkboxVisibility={CheckboxVisibility.onHover}
                compact={false}>
              </DetailsList> :

              this.state.tabs[2] && this.state.activeTab == 2 ?
                <DetailsList
                  className={'DetailsList'}
                  items={this.props.items2}
                  columns={this.props.columns}
                  checkboxVisibility={CheckboxVisibility.onHover}
                  compact={false}>
                </DetailsList> :

                this.state.tabs[3] && this.state.activeTab == 3 ?
                  <DetailsList
                    className={'DetailsList'}
                    items={this.props.items3}
                    columns={this.props.columns}
                    checkboxVisibility={CheckboxVisibility.onHover}
                    compact={false}>
                  </DetailsList> :

                  <DetailsList
                    className={'DetailsList'}
                    items={this.props.items0}
                    columns={this.props.columns}
                    checkboxVisibility={CheckboxVisibility.onHover}
                    compact={false}>
                  </DetailsList>
        }
        <br></br>
      </div>
    );
  }
  /*
    public returnItemsOfActiveTab(): IItem[] {
      var itemsOfActiveTab = null;
        this.props.items.forEach(array => {
        if (array.value.indexOf.toString == this.state.activeTab.toString) {
          console.log(array.value.indexOf.toString);
          itemsOfActiveTab = array;
        }
      });
      return itemsOfActiveTab;
    }
  */
  /*
   public getTabByNumber(tabNumber: number): ITab {
     var tab = null;
     switch (tabNumber) {
       case 0:
         tab = this.state.tab0;
         break;
       case 1:
         tab = this.state.tab1;
         break;
       case 2:
         tab = this.state.tab2;
         break;
       case 3:
         tab = this.state.tab3;
         break;
       default:  tab = this.state.tab0;
         break;
     }
     return tab;
   }
*/
  public async changeActiveTab(tabNumber: number): Promise<void> {
    this.setState({ activeTab: tabNumber });
    //  console.log('activeTab: ' + this.state.tabs[tabNumber].list.listTitle);
  }

  public async addTab(): Promise<void> {
    if (this.state.tabs.length >= 4) {
      console.log('There can not be more than 4 tabs on this web part.');
    } else {
      var tabToAdd: ITab;
      let newTabIndex = this.state.tabs.length + 1;
      let newList = await this.props.renderedListsFromSite[newTabIndex];
      console.log('')
      var newTab: {
        tabIndex: number;
        list: IRenderedListFromSite;
      };
      if (this.state.tabs.length > 0) {
        newTab = {
          tabIndex: newTabIndex,
          list: newList,
        }
      } else {
        newTab = {
          tabIndex: newTabIndex,
          list: newList,
        }
        this.changeActiveTab(newTabIndex);
      }
      tabToAdd = newTab;
      var newTabs = this.state.tabs.concat(tabToAdd);
      this.setState({
        tabs: newTabs
      })
      this.changeActiveTab(newTabIndex);
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

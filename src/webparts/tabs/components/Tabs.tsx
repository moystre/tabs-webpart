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
    if (this.state.tabs.length == 1) {
      this.changeActiveTab(0);
    }
  }

  public render(): React.ReactElement<IListViewProps> {
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
              &nbsp;
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
              {this.canCloseTab(1) ?
                <DefaultButton
                  className={styles.deleteTab}
                  text={'×'}
                  onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                    this.closeTab(1);
                  }} /> : null}
              &nbsp;
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
              {this.canCloseTab(2) ?
                <DefaultButton
                  className={styles.deleteTab}
                  text={'×'}
                  onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                    this.closeTab(2);
                  }} /> : null}
              &nbsp;
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
              {this.canCloseTab(3) ?
                <DefaultButton
                  className={styles.deleteTab}
                  text={'×'}
                  onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                    this.closeTab(3);
                  }} /> : null}
              &nbsp;
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

  public async changeActiveTab(tabNumber: number): Promise<void> {
    this.setState({ activeTab: (tabNumber) });
    this.render();
  }

  public async closeTab(tabNumber: number): Promise<void> {
    var currentTabs = this.state.tabs;
    currentTabs.splice(tabNumber, 1);
    this.setState({
      tabs: currentTabs
    })
    this.changeActiveTab(this.state.tabs.length -1);

  }

  public canCloseTab(tabNumber: number): boolean {
    if (this.state.tabs.length == (tabNumber + 1)) {
      return true;
    } else {
      return false;
    }
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
      }
      tabToAdd = newTab;
      var newTabs = this.state.tabs.concat(tabToAdd);
      this.setState({
        tabs: newTabs
      })
      // this.changeActiveTab(newTabIndex);
      this.changeActiveTab(this.state.tabs.length -1);
    }
    this.changeActiveTab(this.state.tabs.length -1);
    return null;
  }
}

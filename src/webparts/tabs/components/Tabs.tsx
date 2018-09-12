import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { CheckboxVisibility, DetailsList } from 'office-ui-fabric-react/lib/DetailsList';
import * as React from 'react';
import { IListViewProps } from './ITabsProps';
import styles from './Tabs.module.scss';


export default class ListView extends React.Component<IListViewProps, {}> {
  public activeTab: number = 0;

  constructor(props) {
    super(props);
  }

  handleTabSwitch(active) {
    this.activeTab = active;
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


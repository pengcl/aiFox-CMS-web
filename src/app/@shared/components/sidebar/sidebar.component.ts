import {Component} from '@angular/core';
import {AuthService} from '../../../pages/auth/auth.service';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {treeToNoteTree, FileNode} from '../../../@core/utils/utils';

const TREE_DATA = [
  {
    name: '控制台'
  },
  {
    name: '菜单管理'
  },
  {
    name: '用户管理'
  },
  {
    name: '系统设置'
  }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: []
})
export class SidebarComponent {
  nestedTreeControl: NestedTreeControl<FileNode>;
  nestedDataSource: MatTreeNestedDataSource<FileNode>;

  constructor(authSvc: AuthService) {
    this.nestedTreeControl = new NestedTreeControl<FileNode>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
    this.nestedDataSource.data = treeToNoteTree(TREE_DATA);
    console.log(this.nestedDataSource.data);
  }

  hasNestedChild = (_: number, nodeData: FileNode) => !nodeData.type;

  // tslint:disable-next-line:variable-name
  private _getChildren = (node: FileNode) => node.children;
}

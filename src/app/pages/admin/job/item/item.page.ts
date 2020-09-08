import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {DialogService} from '../../../../@core/modules/dialog';
import {JobService} from '../job.service';
import {PostService} from '../../post/post.service';
import {SupplierService} from '../../supplier/supplier.service';
import {LevelService} from '../../../../@core/services/level.service';
import {ProjectService} from '../../project/project.service';
import {QualificationService} from '../../../../@core/services/qualification.service';

@Component({
  selector: 'app-admin-job-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss']
})
export class AdminJobItemPage {
  id = this.route.snapshot.params.id;
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
    post: new FormControl('', [Validators.required]),
    qualification: new FormControl('', [Validators.required]),
    years: new FormControl('', [Validators.required, Validators.min(0)]),
    project: new FormControl('', [Validators.required]),
    supplier: new FormControl('', [Validators.required]),
    nums: new FormControl('', [Validators.required, Validators.min(0)]),
    inTime: new FormControl('', [Validators.required]),
    level: new FormControl('', [Validators.required])
  });
  posts;
  levels;
  suppliers;
  qualifications;
  projects;
  data;

  constructor(private route: ActivatedRoute,
              private location: LocationStrategy,
              private dialogSvc: DialogService,
              private postSvc: PostService,
              private supplierSvc: SupplierService,
              private levelSvc: LevelService,
              private projectSvc: ProjectService,
              private qualificationSvc: QualificationService,
              private jobSvc: JobService) {
    if (this.id !== '0') {
      this.jobSvc.item(this.id).subscribe(res => {
        this.data = res;
        this.form.get('name').setValue(res.name);
        this.form.get('post').setValue(res.post.id);
        this.form.get('qualification').setValue(res.qualification.id);
        this.form.get('years').setValue(res.years);
        this.form.get('project').setValue(res.project.id);
        this.form.get('supplier').setValue(res.supplier.id);
        this.form.get('nums').setValue(res.nums);
        this.form.get('inTime').setValue(res.inTime);
        this.form.get('level').setValue(res.level.id);
      });
    }
    postSvc.list().subscribe(res => {
      this.posts = res;
    });
    levelSvc.list().subscribe(res => {
      this.levels = res;
    });
    supplierSvc.list().subscribe(res => {
      this.suppliers = res;
    });
    qualificationSvc.list().subscribe(res => {
      this.qualifications = res;
    });
    projectSvc.list().subscribe(res => {
      this.projects = res;
    });
  }

  save() {
    if (this.id === '0') {
      this.jobSvc.post(this.form.value).subscribe(res => {
        this.dialogSvc.show({content: '添加成功', cancel: '', confirm: '我知道了'}).subscribe();
        this.location.back();
      });
    } else {
      this.jobSvc.put(this.id, this.form.value).subscribe(res => {
        this.dialogSvc.show({content: '修改成功', cancel: '', confirm: '我知道了'}).subscribe();
      });
    }
  }

}

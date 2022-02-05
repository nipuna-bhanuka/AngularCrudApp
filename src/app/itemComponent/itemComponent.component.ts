import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { itemModel } from './item-dashboard.model';

@Component({
  selector: 'app-itemComponent',
  templateUrl: './itemComponent.component.html',
  styleUrls: ['./itemComponent.component.css']
})
export class ItemComponentComponent implements OnInit {

  formValue !: FormGroup;
  itemModelObj : itemModel = new itemModel();
  itemData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(private formbuilder: FormBuilder,
    private api : ApiService) { }


  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      itemName : [''],
      itemPrice : [''],
      itemQty : ['']
    })
    this.getAllItem();
  }
  clickAddItem(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postItemDetails(){
    this.itemModelObj.itemName = this.formValue.value.itemName;
    this.itemModelObj.itemPrice = this.formValue.value.itemPrice;
    this.itemModelObj.itemQty = this.formValue.value.itemQty;

    this.api.postItem(this.itemModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Item added sucessfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllItem();
    },
    err=>{
      alert("Something went wrong")
    })
  }
  getAllItem(){
    this.api.getItem(this.itemModelObj)
    .subscribe(res=>{
      this.itemData = res;
    })
  }
  deleteItem(row: any){
    this.api.deleteItem(row.id)
    .subscribe(res=>{
      alert("Are you sure dele item?");
      this.getAllItem();
    },
    err=>{
    alert("Something went wrong")
    })
  }
  onEdit(row : any){
    this.showAdd = false;
    this.showUpdate = true;

    this.itemModelObj.id = row.id;
    this.formValue.controls['itemName'].setValue(row.itemName);
    this.formValue.controls['itemPrice'].setValue(row.itemPrice);
    this.formValue.controls['itemQty'].setValue(row.itemQty);
  }
  updateItemDetails(){
    this.itemModelObj.itemName = this.formValue.value.itemName;
    this.itemModelObj.itemPrice = this.formValue.value.itemPrice;
    this.itemModelObj.itemQty = this.formValue.value.itemQty;

    //console.log(this.itemModelObj.itemName);
    //console.log(this.itemModelObj.itemPrice);
    //console.log(this.itemModelObj.itemQty);

    this.api.updateItem(this.itemModelObj,this.itemModelObj.id)
    .subscribe(res=>{
      alert("Update Sucessfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllItem();
    },
    err=>{
      alert("Something went wrong")
    })
  }

}

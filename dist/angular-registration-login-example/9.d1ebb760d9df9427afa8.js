(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{kj4C:function(e,t,i){"use strict";i.r(t),i.d(t,"SucursalModule",(function(){return k}));var r=i("ofXK"),s=i("3Pt+"),c=i("tyNb"),n=i("fXoL");let b=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=n.Cb({type:e,selectors:[["app-layout"]],decls:3,vars:0,consts:[[1,"p-4"],[1,"container"]],template:function(e,t){1&e&&(n.Lb(0,"div",0),n.Lb(1,"div",1),n.Jb(2,"router-outlet"),n.Kb(),n.Kb())},directives:[c.h],styles:[""]}),e})();var o=i("SxV6"),a=i("J9tS");function l(e,t){1&e&&(n.Lb(0,"h1"),n.jc(1,"Agregar Empresas"),n.Kb())}function u(e,t){1&e&&(n.Lb(0,"h1"),n.jc(1,"Editar Empresas"),n.Kb())}function d(e,t){if(1&e&&(n.Lb(0,"option",21),n.jc(1),n.Kb()),2&e){const e=t.$implicit;n.Yb("value",e.id),n.xb(1),n.lc(" ",e.razonSocial," ")}}function p(e,t){1&e&&(n.Lb(0,"div"),n.jc(1,"este campo es requerido"),n.Kb())}function f(e,t){if(1&e&&(n.Lb(0,"div",22),n.ic(1,p,2,0,"div",0),n.Kb()),2&e){const e=n.Ub();n.xb(1),n.Xb("ngIf",e.f.razonSocial.errors.required)}}function m(e,t){1&e&&n.Jb(0,"span",23)}const h=function(e){return{"is-invalid":e}};let g=(()=>{class e{constructor(e,t,i,r,s,c){this.formBuilder=e,this.route=t,this.router=i,this.empresaService=r,this.alertService=s,this.sucursalService=c,this.loading=!1,this.submitted=!1,this.empresas=null,this.sucursales=null}ngOnInit(){this.id=this.route.snapshot.params.id,this.isAddMode=!this.id,this.empresaService.getAll().pipe(Object(o.a)()).subscribe(e=>{this.empresas=e,console.log(this.empresas)}),this.form=this.formBuilder.group({razonSocial:["",s.l.required],rut:[""],descripcion:[""],giro:[""],actividad:[""],direccion:[""],idEmpresa:["",s.l.required]}),this.isAddMode||this.sucursalService.getById(this.id).pipe(Object(o.a)()).subscribe(e=>{this.f.razonSocial.setValue(e.razonSocial),this.f.rut.setValue(e.rut),this.f.descripcion.setValue(e.descripcion),this.f.giro.setValue(e.giro),this.f.actividad.setValue(e.actividad),this.f.direccion.setValue(e.direccion),this.f.idEmpresa.setValue(e.idEmpresa)})}get f(){return this.form.controls}onSubmit(){this.submitted=!0,this.alertService.clear(),this.form.invalid||(this.loading=!0,this.isAddMode?this.createSucursal():this.updateSucursal())}createSucursal(){this.sucursalService.create(this.form.value).pipe(Object(o.a)()).subscribe(e=>{this.alertService.success("Sucursal creado con exito",{keepAfterRouteChange:!0}),this.router.navigate([".",{relativeTo:this.route}])},e=>{this.alertService.error(e),this.loading=!1})}updateSucursal(){this.sucursalService.update(this.id,this.form.value).pipe(Object(o.a)()).subscribe(e=>{this.alertService.success("Sucursal editado con Exito",{keepAfterRouteChange:!0}),this.router.navigate(["..",{relativeTo:this.route}])},e=>{this.alertService.error(e),this.loading=!1})}}return e.\u0275fac=function(t){return new(t||e)(n.Ib(s.b),n.Ib(c.a),n.Ib(c.c),n.Ib(a.d),n.Ib(a.b),n.Ib(a.g))},e.\u0275cmp=n.Cb({type:e,selectors:[["app-sucursal-form"]],decls:48,vars:14,consts:[[4,"ngIf"],[3,"formGroup","ngSubmit"],[1,"form-row"],[1,"form-group"],["for","idEmpresa"],["name","idEmpresa","id","idEmpresa","formControlName","idEmpresa",1,"form-control",3,"ngClass"],["selected",""],[3,"value",4,"ngFor","ngForOf"],[1,"form-group","col"],["for","razonSocial"],["type","text","formControlName","razonSocial",1,"form-control",3,"ngClass"],["class","invalid-feedback",4,"ngIf"],["for","nombre"],["type","text","formControlName","rut",1,"form-control"],["type","text","formControlName","giro",1,"form-control"],["type","text","formControlName","actividad",1,"form-control"],["type","text","formControlName","direccion",1,"form-control"],["type","text","formControlName","descripcion",1,"form-control"],[1,"btn","btn-primary",3,"disabled"],["class","spinner-border spinner-border-sm mr-1",4,"ngIf"],["routerLink","/sucursales",1,"btn","btn-link"],[3,"value"],[1,"invalid-feedback"],[1,"spinner-border","spinner-border-sm","mr-1"]],template:function(e,t){1&e&&(n.ic(0,l,2,0,"h1",0),n.ic(1,u,2,0,"h1",0),n.Lb(2,"h2"),n.jc(3),n.Kb(),n.Lb(4,"form",1),n.Sb("ngSubmit",(function(){return t.onSubmit()})),n.Lb(5,"div",2),n.Lb(6,"div",3),n.Lb(7,"label",4),n.jc(8,"Empresa"),n.Kb(),n.Lb(9,"select",5),n.Lb(10,"option",6),n.jc(11,"Seleccionar"),n.Kb(),n.ic(12,d,2,2,"option",7),n.Kb(),n.Kb(),n.Kb(),n.Lb(13,"div",2),n.Lb(14,"div",8),n.Lb(15,"label",9),n.jc(16,"Razon Social"),n.Kb(),n.Jb(17,"input",10),n.ic(18,f,2,1,"div",11),n.Kb(),n.Lb(19,"div",8),n.Lb(20,"label",12),n.jc(21,"RUT"),n.Kb(),n.Jb(22,"input",13),n.Kb(),n.Kb(),n.Lb(23,"div",2),n.Lb(24,"div",8),n.Lb(25,"label",12),n.jc(26,"Giro"),n.Kb(),n.Jb(27,"input",14),n.Kb(),n.Lb(28,"div",8),n.Lb(29,"label",12),n.jc(30,"Actividad"),n.Kb(),n.Jb(31,"input",15),n.Kb(),n.Kb(),n.Lb(32,"div",2),n.Lb(33,"div",8),n.Lb(34,"label",12),n.jc(35,"Direccion"),n.Kb(),n.Jb(36,"input",16),n.Kb(),n.Lb(37,"div",8),n.Lb(38,"label",12),n.jc(39,"Descripcion"),n.Kb(),n.Jb(40,"input",17),n.Kb(),n.Kb(),n.Lb(41,"div",2),n.Lb(42,"div",3),n.Lb(43,"button",18),n.ic(44,m,1,0,"span",19),n.jc(45," Guardar "),n.Kb(),n.Lb(46,"a",20),n.jc(47,"Cancelar"),n.Kb(),n.Kb(),n.Kb(),n.Kb()),2&e&&(n.Xb("ngIf",t.isAddMode),n.xb(1),n.Xb("ngIf",!t.isAddMode),n.xb(2),n.lc("el ID: ",t.idEmpresa,""),n.xb(1),n.Xb("formGroup",t.form),n.xb(5),n.Xb("ngClass",n.cc(10,h,t.submitted&&t.f.idEmpresa.errors)),n.xb(3),n.Xb("ngForOf",t.empresas),n.xb(5),n.Xb("ngClass",n.cc(12,h,t.submitted&&t.f.razonSocial.errors)),n.xb(1),n.Xb("ngIf",t.submitted&&t.f.razonSocial.errors),n.xb(25),n.Xb("disabled",t.loading),n.xb(1),n.Xb("ngIf",t.loading))},directives:[r.k,s.n,s.g,s.d,s.k,s.f,s.c,r.i,s.h,s.m,r.j,s.a,c.f],styles:[""]}),e})();var L=i("wTWD");function v(e,t){1&e&&n.Jb(0,"span",8)}function K(e,t){1&e&&(n.Lb(0,"span"),n.jc(1,"Eliminar"),n.Kb())}function S(e,t){if(1&e){const e=n.Mb();n.Lb(0,"tr"),n.Lb(1,"td"),n.jc(2),n.Kb(),n.Lb(3,"td"),n.jc(4),n.Kb(),n.Lb(5,"td"),n.jc(6),n.Kb(),n.Lb(7,"td"),n.jc(8),n.Kb(),n.Lb(9,"td"),n.jc(10),n.Kb(),n.Lb(11,"td"),n.jc(12),n.Kb(),n.Lb(13,"td",4),n.Lb(14,"a",5),n.jc(15,"Editar"),n.Kb(),n.Lb(16,"button",6),n.Sb("click",(function(){n.ec(e);const i=t.$implicit;return n.Ub().deleteSucursal(i.id)})),n.ic(17,v,1,0,"span",7),n.ic(18,K,2,0,"span",3),n.Jb(19,"br"),n.Kb(),n.Kb(),n.Kb()}if(2&e){const e=t.$implicit;n.xb(2),n.kc(e.razonSocial),n.xb(2),n.kc(e.rut),n.xb(2),n.kc(e.giro),n.xb(2),n.kc(e.actividad),n.xb(2),n.kc(e.direccion),n.xb(2),n.kc(e.idEmpresa),n.xb(2),n.Zb("routerLink","edit/",e.id,""),n.xb(2),n.Xb("disabled",e.isDeleting),n.xb(1),n.Xb("ngIf",e.isDeleting),n.xb(1),n.Xb("ngIf",!e.isDeleting)}}function j(e,t){1&e&&(n.Lb(0,"tr"),n.Lb(1,"td",9),n.Jb(2,"span",10),n.Kb(),n.Kb())}const x=[{path:"",component:b,children:[{path:"",component:(()=>{class e{constructor(e){this.sucursalService=e,this.sucursales=null}ngOnInit(){this.sucursalService.getAll().pipe(Object(o.a)()).subscribe(e=>this.sucursales=e),console.log(this.sucursales)}deleteSucursal(e){const t=this.sucursales.find(t=>t.id===e);confirm("Esta seguro que desea eliminar el registro: ")&&(t.isDeleting=!0,this.sucursalService.delete(e).pipe(Object(o.a)()).subscribe(()=>{this.sucursales=this.sucursales.filter(t=>t.id!==e)}),t.isDeleting=!1)}}return e.\u0275fac=function(t){return new(t||e)(n.Ib(L.a))},e.\u0275cmp=n.Cb({type:e,selectors:[["app-sucursal-list"]],decls:24,vars:2,consts:[["routerLink","add",1,"btn","btn-sm","btn-success","mb-2"],[1,"table","table-striped"],[4,"ngFor","ngForOf"],[4,"ngIf"],[2,"white-space","nowrap"],[1,"btn","btn-sm","btn-primary","mr-1",3,"routerLink"],[1,"btn","btn-sm","btn-danger","btn-delete-sucursal",3,"disabled","click"],["class","spinner-border spinner-border-sm",4,"ngIf"],[1,"spinner-border","spinner-border-sm"],["colspan","4",1,"text-center"],[1,"spinner-border","spinner-border-lg","align-center"]],template:function(e,t){1&e&&(n.Lb(0,"h1"),n.jc(1,"Sucursales"),n.Kb(),n.Lb(2,"a",0),n.jc(3,"Agregar Sucursales"),n.Kb(),n.Lb(4,"table",1),n.Lb(5,"thead"),n.Lb(6,"tr"),n.Lb(7,"th"),n.jc(8,"RazonSocial"),n.Kb(),n.Lb(9,"th"),n.jc(10,"RUT"),n.Kb(),n.Lb(11,"th"),n.jc(12,"Giro"),n.Kb(),n.Lb(13,"th"),n.jc(14,"Actividad"),n.Kb(),n.Lb(15,"th"),n.jc(16,"Direccion"),n.Kb(),n.Lb(17,"th"),n.jc(18,"Empresa"),n.Kb(),n.Lb(19,"th"),n.jc(20,"Acciones"),n.Kb(),n.Kb(),n.Kb(),n.Lb(21,"tbody"),n.ic(22,S,20,10,"tr",2),n.ic(23,j,3,0,"tr",3),n.Kb(),n.Kb()),2&e&&(n.xb(22),n.Xb("ngForOf",t.sucursales),n.xb(1),n.Xb("ngIf",!t.sucursales))},directives:[c.f,r.j,r.k],styles:[""]}),e})()},{path:"add",component:g},{path:"edit/:id",component:g}]}];let I=(()=>{class e{}return e.\u0275mod=n.Gb({type:e}),e.\u0275inj=n.Fb({factory:function(t){return new(t||e)},imports:[[c.g.forChild(x)],c.g]}),e})(),k=(()=>{class e{}return e.\u0275mod=n.Gb({type:e}),e.\u0275inj=n.Fb({factory:function(t){return new(t||e)},imports:[[r.b,I,s.j]]}),e})()}}]);
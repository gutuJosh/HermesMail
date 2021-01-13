import Store from "./Storage.js";

const StoreFormData = (formName) => {

    this.formName = formName;


    this.addData = (name, value) => {
        const data = Store.getLocal(formName) === false ? {} : JSON.parse(Store.getLocal(this.formName));
        data[name] = value;
        Store.setLocal(this.formName, JSON.stringify(data));
    }

    this.getData = () => JSON.parse(Store.getLocal(this.formName));

    this.clearData = () => Store.removeLocalItem(this.formName);
}

export default StoreFormData;
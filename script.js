const form = document.querySelector('form');
const input = document.querySelector //Notumuzu ekleyebilmek için bu işlemi yaptık.
('#txtNotName');
const btnDeleteAll = document.querySelector // Hepsini sil butonumuzu aktif ettik.
('btnDeleteAll');
const Notlist = document.querySelector //Not listemizi aktif ettik.
('#Not-list');
//Fonksiyon kullanıp tek bir yerden kontrol ettik.
eventListeners();

function eventListeners(){
    form.addEventListener('submit',addNewItem)
    
} 

function addNewItem(e){
    if(input.value ===''){
        alert('Lütfen Bir Not Giriniz!') //Boş bir metin eklenmesi durumunda uyarı vermesini sağladık.
    }
    
    
    
    e.preventDefault();
}
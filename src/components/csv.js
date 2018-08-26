import $ from 'jquery';

var CSV;
$.get('C2ImportFamRelSample.csv', (data) => {
    CSV = data.split('\n');
    console.log('1', CSV);
});

if(!CSV){
    setTimeout(() => {
        
    }, 5000);
}
console.log('after');

export default CSV;

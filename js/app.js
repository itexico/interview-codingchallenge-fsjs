var secondId = document.getElementById('secondId');
var addList = document.getElementById('addList');
var button = document.getElementById('guardar');

/*-----------------AÑADIR LISTA--------------------*/
button.addEventListener('click', creandoLista);

function creandoLista() {
    var newName = document.getElementById('addList').value;
    var newText = document.createTextNode(newName);
    var newElement = document.createElement('h2');
    var newList = document.createTextNode('Añadir elementos');
    var newLink = document.createElement('a');
    var containerElement = document.createElement('div');
    containerElement.className = 'container  containerauto';
    newElement.className = 'newElement';
    newLink.className = 'link';

    addList.value = '';

    secondId.appendChild(containerElement);
    newElement.appendChild(newText);
    containerElement.appendChild(newElement);

    newLink.appendChild(newList);
    containerElement.appendChild(newLink);

    /*-----------------AÑADIR ELEMENTOS--------------------*/
    newLink.addEventListener('click', function() {

        var buttonAdd = document.createElement('button');
        var textArea = document.createElement('textArea');
        var btnX = document.createElement('button');
        buttonAdd.className = 'buttonAdd';
        textArea.className = 'textArea';
        btnX.className = 'btnCancel'

        document.getElementById('addList').value;

        buttonAdd.appendChild(document.createTextNode('Añadir'));
        newLink.appendChild(buttonAdd);
        btnX.appendChild(document.createTextNode('x'));

        containerElement.appendChild(textArea);
        containerElement.appendChild(buttonAdd);
        containerElement.appendChild(btnX);
        secondId.appendChild(containerElement);

        newLink.style.display = 'none';

        /*-----------------BORRANDO LISTA--------------------*/
        btnX.addEventListener('click', function() {
            containerElement.style.display = 'none';
        });

        /*-----------------FOCUS EN TEXT AREA--------------------*/
        textArea.onfocus = ('click', function() {
            textArea.style.backgroundColor = 'rgb(218, 214, 214)';
        });
        /*-----------------AÑADIR NUEVAS LISTAS Y BORRAR ANTERIORES--------------------*/
        buttonAdd.addEventListener('click', function() {

            var addTextArea = textArea.value;
            var newTextArea = document.createElement('h4');

            textArea.value = '';

            newTextArea.innerText = addTextArea;
            containerElement.appendChild(newTextArea);
            secondId.appendChild(containerElement);

            containerElement.insertBefore(newTextArea, textArea);

        });

    });

};
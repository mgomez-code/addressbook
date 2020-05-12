const contractSource = `
contract AddressBook =

  record person = {   // Valores claves a guardar
    first_name  : string,
    last_name   : string,
    age         : int  }
  
  record state  = {  // Variables definidas
    people      : map(address, person)  }
 
  entrypoint init() = {  //Función de Inicio
    people = {}  }

  private function lookupByAddress(k : address, m, v) =  //Función Privada verificar dirección 
    switch(Map.lookup(k, m))
      None    => v
      Some(x) => x
  
  //Función que registra dirección
  stateful entrypoint addPerson(address: address, first_name: string, last_name: string, age: int) : bool =
    put(state{
      people[address] = {first_name = first_name, last_name = last_name, age = age}  })
    true
 
  entrypoint getPerson(address : address) : person = //Función mostrar datos según la dirección
    let personFound = lookupByAddress(address, state.people, {first_name = "false", last_name = "false", age = 0})
    if (personFound.first_name == "false" && personFound.last_name == "false" && personFound.age == 0)
      abort("No data for that person")
    else
      personFound
  
  //Funciones básicas
  
  stateful entrypoint contract_creator() = //dirección que creo el contracto
    Contract.creator

  stateful entrypoint contract_address() = //dirección del contracto
    Contract.address

  stateful entrypoint contract_balance() = //balance del contracto
    Contract.balance
`;

//Address of the  smart contract on the testnet of the aeternity blockchain
//Dirección del contrato inteligente en el testnet de la blockchain de aeternity
const contractAddress = 'ct_msqT9nUXKHCSN4ugEGk1ifD1KDpHpA3fjAKvdKqPx3gELZHNv';


//Create variable for client so it can be used in different functions
//Crear la variable cliente para las funciones
var client = null;

//Create a new global array for the addresss
//Crea un array para las direcciones
var addressArray = [];


//Create a asynchronous read call for our smart contract
//Cree una llamada de lectura asincrónica para uso de funciones estáticas
async function callStatic(func, args) {
	
	//Create a new contract instance that we can interact with
	//Cree una nueva instancia de contrato con la que podamos interactuar
	const contract = await client.getContractInstance(contractSource, {contractAddress});

	//Make a call to get data of smart contract func, with specefied arguments
	//Realice una llamada para obtener datos de funciones de contratos inteligentes, con argumentos específicos
	const calledGet = await contract.call(func, args, {callStatic: true}).catch(e => console.error(e));

	//Make another call to decode the data received in first call
	//Realice otra llamada para decodificar los datos recibidos en la primera llamada
	const decodedGet = await calledGet.decode().catch(e => console.error(e));

	return decodedGet;
}

//Create a asynchronous write call for our smart contract
//Cree una llamada de escritura asincrónica para las funciones dinámicas
async function contractCall(func, args, value) {

	const contract = await client.getContractInstance(contractSource, {contractAddress});
	//Make a call to write smart contract func, with aeon value input
	//Realice una llamada para escribir una función de contrato inteligente, con una entrada de valor eón

	//Make a call to get data of smart contract func, with specefied arguments
	//Realice una llamada para obtener datos de funciones de contratos inteligentes, con argumentos específicos
	const calledSet = await contract.call(func, args, {amount: value}).catch(e => console.error(e));

	return calledSet;
}

//Execute main function
//Ejecutar función principal
window.addEventListener('load', async () => {

	//Display the loader animation so the user knows that something is happening
	//Muestra la animación de cargando....
	$("#loader").show();

	//Initialize the Aepp object through aepp-sdk.browser.js, the base app needs to be running.
	//Inicialice el objeto Aepp a través de aepp-sdk.browser.js, la aplicación base debe estar ejecutándose.
	client = await Ae.Aepp();

	//Hide loader animation
	//Oculta la animación de cargando
	$("#loader").hide();
});



 //Oculta la animación de cargando


//If someone clicks to consult a adress,  execute getPerson
//Si alguien hace clic para consultar una dirección, ejecute getPerson
$('#consultBtn').click(async function(){
	$("#loader").show();

    const address = ($('#regAddress').val());
	const consul = await contractCall('getPerson', [address], 0);
	
	//Show notice
	//Mostrar avisos
	if(consul === undefined){
		div = document.getElementById('notice');
		div.style.display = '';
		$('#regName').val('');
		$('#regLast').val('');
		$('#regAge').val('');		
	} else {
		div = document.getElementById('notice');
		div.style.display = 'none';
		const consul1 = await callStatic('getPerson',[address]);
		$('#regName').val(consul1.first_name);
		$('#regLast').val(consul1.last_name);
		$('#regAge').val(consul1.age);		
	}
   
	$("#loader").hide();
});

//If someone clicks to register a adress, get the input and execute the regAddress
//Si alguien hace clic para registrar una dirección, obtenga la entrada y ejecute el regAddress
$('#registerBtn').click(async function(){
	$("#loader").show();

  //Create four new variables for get the values from the input fields
  //Cree cuatro nuevas variables para obtener los valores de los campos de entrada.
	const address = ($('#regAddress').val()),
		first_name = ($('#regName').val()),
        last_name = ($('#regLast').val()),
        age = ($('#regAge').val());

  //Make the contract call to register the address with the newly passed values
  //Llame al contrato para registrar la dirección con los valores recibidos
	await contractCall('addPerson', [address, first_name,last_name,age], 0);

  //Add the new created addressobject to our addressArray
  //Agregue el nuevo addressobject pasado a addressArray
	addressArray.push({
		a_address: name,
		a_name: first_name,
		a_last: last_name,
		a_age: age,
		index: addressArray.length+1,
	})

	//Reset page
	//Reiniciar la página
	$('form').trigger("reset");
	
	$("#loader").hide();
});
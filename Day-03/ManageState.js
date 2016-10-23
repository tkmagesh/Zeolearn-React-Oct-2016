function Store(...reducers){
	var _state = null;
	var _reducers = reducers;

	
	this.dispatch = function(action){
		for(var i=0; i < _reducers.length; i++)
			_state = _reducers[i](action, _state);
		triggerCallbacks();
	}
	this.getState = function(){
		return _state;
	}
	function triggerCallbacks(){
		
		_eventHandlers.forEach(function(callbackFn){
			if (typeof callbackFn === 'function')
				callbackFn();
		});
	}
	var _eventHandlers = [];

	this.subscribe = function(callbackFn){
		_eventHandlers.push(callbackFn);
	}
}

function counterReducer(action, currentState){
	if (!action) return 0;
	if (action.type === 'INCREMENT'){
		return ++currentState;
	} else if (action.type === 'DECREMENT'){
		return --currentState;
	} 
}

var store = new Store(counterReducer);
store.subscribe(function(){
	console.log(store.getState());
});



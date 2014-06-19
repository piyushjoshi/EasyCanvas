function exposeAPI(toObj){
	if(!toObj.ContextWrapper){
		toObj.ContextWrapper = ContextWrapper;
	}
}

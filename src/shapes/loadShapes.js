function loadShapes(toObj){
	var k;
	for(k in shapes){
		toObj.prototype[k.toLowerCase()] = function(){
			var k_ = k; // required for killing closure of k
			return function(){
				return new shapes[k_](this.getContext());
			}
		}();
	}
}

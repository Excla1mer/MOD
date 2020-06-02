//ymaps.ready(init);
var myMap
var z = 12
var UE = 1
var UE_Speed = 10
var min_speed, max_speed;
var save = [];
var min = [55.15115814948433,83.03663130027567];
let fruits = [55.15115814948433,83.03663130027567];
function translate_Speed_to_kord(Speed) {
	return ((Speed/3.6) * 0.00000835)
}
function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}
getRandomFloat(11, 101)
function init() {
    var myMap = new ymaps.Map("map", {
            center: [55.039929685410364,82.98502649652931],
            zoom: z
        }, {

            searchControlProvider: 'yandex#search'
        });
    //console.log("Hello")
    /*function path(i) {
	    ymaps.route([[pos[i][0], pos[i][1]], [pos[i][3], pos[i][4]]
	    	]).then(function (route) {
	    		myMap.geoObjects.add(route);
	    		var points = route.getWayPoints(), lastPoint = points.getLength() - 1;
	    		for (var i = 0; i < route.getPaths().getLength(); i++) {
	    			way = route.getPaths().get(i);
	    			t = way.geometry._coordPath._coordinates[0]	    			
	    		}
	    	})
    }*/
    function move(i) {
    	/*console.log(fruits)
		for(var j = 1; j <= 8; j++) {
    		for(var k = 0; k < 2; k++) {
    			if(k == 0)
    			{
    				console.log("k==0");
    				if((Math.abs((pos[i][0] + translate_Speed_to_kord(pos[i][2]))*(j/8) - pos[i][0 + 3])) < fruits[0])
        			{
        				if(pos[i][3] >= (pos[i][0] + translate_Speed_to_kord(pos[i][2])))
            				fruits[0] = pos[i][0] + translate_Speed_to_kord(pos[i][2])*(j/8);
            			else
            				fruits[0] = pos[i][0] - translate_Speed_to_kord(pos[i][2])*(j/8);
            			console.log("32asfa");
        			}
    			}
    			if(k == 1)
    			{
    				if((Math.abs((pos[i][1] + translate_Speed_to_kord(pos[i][2]))*(j/8) - pos[i][1 + 3])) < fruits[1])
        			{
        				if(pos[i][3] >= (pos[i][0] + translate_Speed_to_kord(pos[i][2])))
            				fruits[1] = pos[i][1] + translate_Speed_to_kord(pos[i][2])*(j/8);
            			else
            				fruits[1] = pos[i][1] - translate_Speed_to_kord(pos[i][2])*(j/8);
            			console.log("654");
        			}
    			}
    		}
		}*/

		//console.log("min =", fruits);
		/*
		var save = [];
		var best = [];
		for(var j = 0; j < 8; j++) {
			var a = j;
			var save = pos;
			console.log(save);
			switch(a) {
         	// [][0] + ^
         	// [][0] - v
         	// [][1] + ->
         	// [][1] - <-
	            case 0: 
	                save[i][0] = save[i][0] + translate_Speed_to_kord(save[i][2])
	                break
	            case 1:
	                save[i][0] = save[i][0] + translate_Speed_to_kord(save[i][2]) * 0.5
	                save[i][1] = save[i][1] + translate_Speed_to_kord(save[i][2]) * 0.5
	                break
	            case 2:
	            	save[i][1] = save[i][1] + translate_Speed_to_kord(save[i][2])
	            	break
	            case 3:
	            	save[i][0] = save[i][0] + translate_Speed_to_kord(save[i][2]) * 0.5
	                save[i][1] = save[i][1] - translate_Speed_to_kord(save[i][2]) * 0.5
	            	break
	            case 4:
	            	save[i][0] = save[i][0] - translate_Speed_to_kord(save[i][2])
	            	break
	            case 5:
	            	save[i][0] = save[i][0] - translate_Speed_to_kord(save[i][2]) * 0.5
	                save[i][1] = save[i][1] - translate_Speed_to_kord(save[i][2]) * 0.5
	            	break
	            case 6:
	            	save[i][1] = save[i][1] - translate_Speed_to_kord(save[i][2])
	            	break
	            case 7:
	            	save[i][0] = save[i][0] + translate_Speed_to_kord(save[i][2]) * 0.5
	                save[i][1] = save[i][1] - translate_Speed_to_kord(save[i][2]) * 0.5
	            	break
			}
			if(Math.abs(save[i][0] - pos[i][3]) < min[0])
			{
				best[0] = save[i][0];
				min[0] = Math.abs(save[i][0] - pos[i][3])
			}
			if(Math.abs(save[i][1] - pos[i][4]) < min[1])
			{
				best[1] = save[i][1];
				min[1] = Math.abs(save[i][1] - pos[i][4])
			}
		}
		pos[i][0] = best[0];
		pos[i][1] = best[1];*/
        var a = getRandomInRange(0, 8)
         switch(a) {
         	// [][0] + ^
         	// [][0] - v
         	// [][1] + ->
         	// [][1] - <-
            case 0: 
                pos[i][0] = pos[i][0] + translate_Speed_to_kord(pos[i][2])
                //console.log(pos[i][2])
                //console.log(translate_Speed_to_kord(pos[i][2]))
                break
            case 1:
                pos[i][0] = pos[i][0] + translate_Speed_to_kord(pos[i][2]) * 0.5
                pos[i][1] = pos[i][1] + translate_Speed_to_kord(pos[i][2]) * 0.5
                break
            case 2:
            	pos[i][1] = pos[i][1] + translate_Speed_to_kord(pos[i][2])
            	break
            case 3:
            	pos[i][0] = pos[i][0] + translate_Speed_to_kord(pos[i][2]) * 0.5
                pos[i][1] = pos[i][1] - translate_Speed_to_kord(pos[i][2]) * 0.5
            	break
            case 4:
            	pos[i][0] = pos[i][0] - translate_Speed_to_kord(pos[i][2])
            	break
            case 5:
            	pos[i][0] = pos[i][0] - translate_Speed_to_kord(pos[i][2]) * 0.5
                pos[i][1] = pos[i][1] - translate_Speed_to_kord(pos[i][2]) * 0.5
            	break
            case 6:
            	pos[i][1] = pos[i][1] - translate_Speed_to_kord(pos[i][2])
            	break
            case 7:
            	pos[i][0] = pos[i][0] + translate_Speed_to_kord(pos[i][2]) * 0.5
                pos[i][1] = pos[i][1] - translate_Speed_to_kord(pos[i][2]) * 0.5
            	break
            case 8:
            	break
         }
    }
    var pos = [];
    for(var i = 0; i < UE; i++) {
        pos[i] = [];
        for (var j = 0; j < 5; j++) {
            if (j == 0)
                pos[i][j] = getRandomFloat(55.01586877478675, 55.063976089265765)
            if (j == 1)
                pos[i][j] = getRandomFloat(82.90434564936132, 83.06570734369727)
            if (j == 2)
            	pos[i][j] = getRandomInRange(min_speed, max_speed)
           	if (j == 3)
           		pos[i][j] = getRandomFloat(55.00413689741506, 55.055548586727056)
           	if (j == 4)
           		pos[i][j] = getRandomFloat(82.9010650446815, 82.96633725630531)
        }
    }
    function play() {
        var placemark = [];
        for (var i = 0; i <  UE; i++) {
            placemark[i] = new ymaps.Placemark([pos[i][0], pos[i][1]]);
            //console.log(cords[i]);
//            get_address(cords[i])
			//path(i);
			//console.log("s= ", s);
            myMap.geoObjects.add(placemark[i]);    
            move(i) 
            //console.log([pos[i][0], pos[i][1]])  
        }

        setTimeout(function() {
            for (var i = 0; i <  UE; i++) {
                myMap.geoObjects.remove(placemark[i]);
            }
            play(pos[i]);
            }, 1000);
    }
    play();
     document.getElementById('delete').onclick = function () {
        // Для уничтожения используется метод destroy.
        myMap.destroy();
    };
}
function Start(obj) {
    ymaps.ready(init);
    UE = obj.Users.value;
    z = obj.Size_map.value;
    min_speed = obj.speed_min.value;
    max_speed = obj.speed_max.value;
}
//ymaps.ready(init);
var myMap
var z = 12
var UE = 1
var UE_Speed = 10
var min_speed, max_speed;
var save = [];
var path_length = [];
var path_points = [];
var steps = [];
let fruits = [55.15115814948433,83.03663130027567];
var BS = []
function translate_Speed_to_kord(Speed) {
	return ((Speed/3.6) * 0.00000835)
}
function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function init() {
    var myMap = new ymaps.Map("map", {
            center: [55.039929685410364,82.98502649652931],
            zoom: z
        }, {

            searchControlProvider: 'yandex#search'
        });
    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
		'<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
		);

    //console.log("Hello")
    function path(k) {
	    ymaps.route([[pos[k][0], pos[k][1]], [pos[k][3], pos[k][4]]
	    	]).then(function (route) {
	    		//myMap.geoObjects.add(route);
	    		var points = route.getWayPoints(), lastPoint = points.getLength() - 1;
	    		for (var i = 0; i < route.getPaths().getLength(); i++) {
	    			way = route.getPaths().get(i);
	    			myMap.geoObjects.add(way.geometry._coordPath._coordinates);
	    			t = way.geometry._coordPath._coordinates[0];	    			
	    		}
	    	})
    }
 //----------------------Функция для получения массива координат для переменщения от А до Б--------------
    function get_path(k) {
    	console.log("get_path");
    	path_length[k] = 0;
        for (var j = 3; j < 5; j++) {         
           	if (j == 3)
           		pos[k][j] = getRandomFloat(55.00413689741506, 55.055548586727056)
           	if (j == 4)
           		pos[k][j] = getRandomFloat(82.9010650446815, 82.96633725630531)
        }
    	ymaps.route([[pos[k][0], pos[k][1]], [pos[k][3], pos[k][4]]
	    	]).then(function (route) {
	    		//myMap.geoObjects.add(route);
	    		var points = route.getWayPoints(), lastPoint = points.getLength() - 1;
	    		var t = 0;
	    		//pos[i][0] = way.geometry._coordPath._coordinates[0];
	    		//pos[i][1] = way.geometry._coordPath._coordinates[1];
    			for (var j = 0; j < route.getPaths().getLength(); j++) {
	    			
	    			way = route.getPaths().get(j);
	    		 	//console.log(way.geometry._coordPath._coordinates);
	    		 	path_length[k] = way.geometry._coordPath._coordinates.length;
	    		 	while(t!=path_length[k]-1){
	    		 		path_points[k][t] = way.geometry._coordPath._coordinates[t];
	    		 		//console.log(way.geometry._coordPath._coordinates[t]);
	    		 		t++;
	    		 	}
	    		 	
	    		}
	  
	    	})      	
        	console.log(path_points[k]);   		
    }
//----------------------------------------------------------------------------------------------------------
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
		/*
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
         }*/

//--------------------------------Перемещение по массиву точек на карте---------------------------------------
        if(steps[i] == 0 || steps[i] == path_length[i]-1 || path_length[i] == 0) {	
        	get_path(i);
        	steps[i] = 0;       	
        }
        else {
        	pos[i][0] = path_points[i][steps[i]][0];
        	pos[i][1] = path_points[i][steps[i]][1];
        	
        }
        steps[i]++;
    }
 //---------------------------------------------------------------------------------------------------
 //-----------------Старотовые инициализации массивов, стартовых точек юзеров и позиций БС------------  
    var pos = [];
    for(var i = 0; i < UE; i++) {
        pos[i] = [];
        steps[i] = 0;
        path_points[i] = [];
		path_points[i][0] = [];
        for (var j = 0; j < 5; j++) {
            if (j == 0)
                pos[i][j] = getRandomFloat(55.01586877478675, 55.063976089265765)
            if (j == 1)
                pos[i][j] = getRandomFloat(82.90434564936132, 83.06570734369727)
            if (j == 2)
            	pos[i][j] = getRandomInRange(min_speed, max_speed);           
        } 
 
    }
//------------------------------------------------------------------------------------------------------
    function play() {
        var placemark = [];
        for (var i = 0; i <  UE; i++) {
            placemark[i] = new ymaps.Placemark([pos[i][0], pos[i][1]]);
           	//get_path(i);
			//console.log(path_points);
            myMap.geoObjects.add(placemark[i]);    
            move(i);
            //console.log([pos[i][0], pos[i][1]]);
        }

        setTimeout(function() {
            for (var i = 0; i <  UE; i++) {
                myMap.geoObjects.remove(placemark[i]);
            }
            play(pos[i]);
            }, 500);
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
    min_speed = Number(obj.speed_min.value);
    max_speed = Number(obj.speed_max.value);
}
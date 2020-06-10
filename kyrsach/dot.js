//ymaps.ready(init);
var myMap
var z = 12
var UE = 1
var UE_Speed = 10
var min_speed, max_speed;
var save = [];
var pos = [];
var time = 0;
var S = 0;
var path_length = [];
var path_points = [];
var steps = [];
var UE_distance = [];
var UE_names = [];
var BS = [];
var R = 900;
var graph = [];
var chart = anychart.line();
var BS_names = ["BS0",
				"BS1",
				"BS2",
				"BS3",
				"BS4",
				"BS5",
				"BS6"]
var BS_quantity = 7;
var BS_cords = [[55.02364180360142, 82.92828024533603],
				[55.0368015905741, 82.9270670972084],
				[55.03154587805858, 82.94887597566755],
				[55.03840032970391, 82.96839874060569],
				[55.02430027762143, 82.9695145395559],
				[55.01719047944062,82.94872168499752],
				[55.04521820286621,82.94750761745556]]

function graph_set() {
		  // create chart and set data
		  // as Array of Arrays
	chart.data({header: UE_names,
		rows:graph});
	chart.title("График изменения SINR по времени");
	chart.legend(true);
    chart.xAxis().title("Время, с");
    chart.yAxis().title("SINR, дБ");
	chart.container("container").draw();

}
// A = 46.3 B = 33.9
function PL(distance) {
    if(distance >= 1000) {
        return (46.3 + 33.9 * Math.log10(2000) - 13.82 * Math.log10(18) - (3.2 * Math.pow(Math.log10(11.75 * 1.5), 2) - 4.97) + (44.9 - 6.55 * Math.log10(2000)) * Math.log10(distance / 1000) + 3);
    } else {
        if( distance < 1000) {
            return (46.3 + 33.9 * Math.log10(2000) - 13.82 * Math.log10(18) - (3.2 * Math.pow(Math.log10(11.75 * 1.5), 2) - 4.97) + ((47.88 + 13.9 * Math.log10(2000) - 13.9 * Math.log10(18)) * (1 / Math.log10(50))) * Math.log10(distance / 1000) + 3);
        }
    }
}
function SINR(uid) {
    var sum = 0;
    var check;
    for (var i = 0; i < BS_quantity; i++) {
        if (BS_names[i] != pos[uid][5]) {
           sum += PL(UE_distance[uid][i]);
        }
        else {
            check = i;
        }
    }
    return (PL(UE_distance[uid][check]) / (4 + sum));
}
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
            center: [55.03154587805858, 82.94887597566755],
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
           		pos[k][j] = getRandomFloat(55.010966850027664, 55.05208360087392)
           	if (j == 4)
           		pos[k][j] = getRandomFloat(82.91863440024133, 82.98034666525598)
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

 //--------------------------------Перемещение по массиву точек на карте---------------------------------------
        if(steps[i] == 0 || steps[i] == path_length[i]-1 || path_length[i] == 0) {	
        	get_path(i);
        	steps[i] = 0;       	
        }
        else {
        	pos[i][2] += (ymaps.coordSystem.geo.getDistance(pos[i], path_points[i][steps[i]])*3.6);
        	pos[i][0] = path_points[i][steps[i]][0];
        	pos[i][1] = path_points[i][steps[i]][1];
        	
        	//document.getElementById('speed_mi').value = pos[i][2]/time;
        }
        
        steps[i]++;
        var min = R + 100;
        var a;
        for(var j = 0; j < BS_quantity; j++) {
        	UE_distance[i][j] = ymaps.coordSystem.geo.getDistance(pos[i], BS_cords[j]);
        	if(min > UE_distance[i][j]) {
        		min = UE_distance[i][j];
        		a = BS_names[j];
        	}
        }
        if(min != R + 100) {
        	pos[i][5] = a;
        	pos[i][6] = min;
        }
        else
        	pos[i][5] = 'NO';
        console.log("BS_name =", pos[i][5])
    }
 //---------------------------------------------------------------------------------------------------
 //-----------------Старотовые инициализации массивов, стартовых точек юзеров и позиций БС------------  
    
    for(var i = 0; i < UE; i++) {
        pos[i] = [];
        UE_distance[i] = [];
        steps[i] = 0;
        path_points[i] = [];
		path_points[i][0] = [];
        for (var j = 0; j < 5; j++) {
            if (j == 0)
                pos[i][j] = getRandomFloat(55.010966850027664, 55.05208360087392)
            if (j == 1)
                pos[i][j] = getRandomFloat(82.91863440024133, 82.98034666525598)
            if (j == 2)
            	pos[i][j] = 0;           
        } 
    }
    for(var i = 0; i < BS_quantity; i++) {
    	BS.push(new ymaps.Circle([BS_cords[i], R]));
		BS[i].name = BS_names[i];
		BS[i].properties.set('hintContent', BS[i].name);
		myMap.geoObjects.add(BS[i]);
    }
    // Измерение расстояния в метрах от BS_cords[0] до BS_cords[1]
    /*var distance = ymaps.coordSystem.geo.getDistance(BS_cords[0], BS_cords[1]);
    console.log(distance);*/
 //------------------------------------------------------------------------------------------------------
    function play() {
        var placemark = [];
        graph[time] = [];
        graph[time][0] = time;
        for (var i = 0; i <  UE; i++) {
            placemark[i] = new ymaps.Placemark([pos[i][0], pos[i][1]]);
           	//get_path(i);
			//console.log(path_points);
            myMap.geoObjects.add(placemark[i]);    
            move(i);
            //placemark[i].properties.set('hintContent', pos[i][2]/time);
            if(pos[i][5] != 'NO') {
            	// console.log("PL(d) = ",PL(pos[i][6]));
            	// console.log("SINR = ",SINR(i));
            	graph[time][i+1] = SINR(i);
            }
            else {
            	graph[time][i+1] = 0;
            }		
            //console.log([pos[i][0], pos[i][1]]);    
        }
        document.getElementById('speed_mi').value = pos[0][2]/time;
        graph_set();
        time++;
        /*
        var mi = 'mi'
        document.getElementById('speed_'+mi).value = "Подача";*/
        
        setTimeout(function() {
            for (var i = 0; i <  UE; i++) {
                myMap.geoObjects.remove(placemark[i]);
            }
            play(pos[i]);
            }, 1000);
    }
    play();
}
function Start(obj) {
    ymaps.ready(init);
    UE = obj.Users.value;
    //z = obj.Size_map.value;
    //min_speed = Number(obj.speed_min.value);
    //max_speed = Number(obj.speed_max.value);
    UE_names[0] = "#";
    for(var i = 1; i < UE + 1; i++) {
        UE_names[i] = "User_" + (i - 1);
    }

}

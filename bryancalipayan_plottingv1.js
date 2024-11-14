<script>
var map;
var path_layer;
<?php
    if(ISSET($_POST['submit_bllm'])){
        $KEY_PROV = $_POST['PROVINCE'];
        $KEY_TOWN = $_POST['MUNICIPALITY'];
        $KEY_STATION = $_POST['STATION_NAME'];
        require '../includes/conn_plot.php';
        $query = mysqli_query($conn_plot, "SELECT * FROM database_ws84 WHERE PROVINCE = '$KEY_PROV' AND MUNICIPALITY = '$KEY_TOWN' AND STATION_NAME = '$KEY_STATION' ") or die(mysqli_error());
        while($fetch = mysqli_fetch_array($query)){ 
?>

<?php
//FROM DATABASE
if(ISSET($_POST['btn_napili'])){

$LAT_84 = $_POST['LAT_84_UNLOC'];
$LON_84 = $_POST['LONG_84_UNLOC'];

}

else{
$LAT_84 = $fetch['LAT_84'];
$LON_84 = $fetch['LONG_84'];  
}

$ZONE_NO = $fetch['ZONE'];
$NORTHING = $fetch['NORTHING'];
$EASTING = $fetch['EASTING'];
$earthRadius = 6378137.0;

$NO_POINTS = $_POST['NO_POINTS'];

//POINT BLLM
$direction_NSEW_BLLM = $_POST['direction_NSEW_BLLM'];
$DEG_BLLM = $_POST['DEG_BLLM'];
$MIN_BLLM = $_POST['MIN_BLLM'];
$SEC_BLLM = $_POST['MIN_BLLM'];
$DISTANCE_BLLM = $_POST['DISTANCE_BLLM'];
if ($direction_NSEW_BLLM == "N_E") {
$BEARING_RAD_BLLM = ROUND(DEG2RAD($DEG_BLLM + $MIN_BLLM/60 + $SEC_BLLM/3600),2);
} 
elseif($direction_NSEW_BLLM == "N_W") {
$BEARING_RAD_BLLM = ROUND(DEG2RAD(-$DEG_BLLM + 360 + $MIN_BLLM/60 + $SEC_BLLM/3600),2);
}
elseif($direction_NSEW_BLLM == "S_E") {  
$BEARING_RAD_BLLM = ROUND(DEG2RAD(($SEC_BLLM/60+$MIN_BLLM)/3600 + (-$DEG_BLLM + 180)),2);
}
elseif($direction_NSEW_BLLM == "S_W") {
$BEARING_RAD_BLLM = ROUND(DEG2RAD($DEG_BLLM + 180 + $MIN_BLLM/60 + $SEC_BLLM/3600),2);
}

$LAT_new = deg2rad($LAT_84);
$LON_new = deg2rad($LON_84);


$lat_bllm_NEW = asin(sin($LAT_new) * cos($DISTANCE_BLLM / $earthRadius) + cos($LAT_new) * sin($DISTANCE_BLLM / $earthRadius) * cos($BEARING_RAD_BLLM));
$lon_bllm_NEW = $LON_new + atan2(sin($BEARING_RAD_BLLM) * sin($DISTANCE_BLLM / $earthRadius) * cos($LAT_new), cos($DISTANCE_BLLM / $earthRadius)- sin($LAT_new) * sin($lat_bllm_NEW));

//$lon_bllm_NEW = fmod($lon_bllm_NEW + 3*M_PI, 2*M_PI) - M_PI;
$LAT_BLLM= round(rad2deg($lat_bllm_NEW),6);
$LON_BLLM= round(rad2deg($lon_bllm_NEW),6);

$direction_NSEW_PT1 = $_POST['direction_NSEW_PT1'];
$DEG_PT1 = $_POST['DEG_PT1'];
$MIN_PT1 = $_POST['MIN_PT1'];
$SEC_PT1 = $_POST['MIN_PT1'];
$DISTANCE_PT1 = $_POST['DISTANCE_PT1'];
if ($direction_NSEW_PT1 == "N_E") {
$BEARING_RAD_PT1 = ROUND(DEG2RAD($DEG_PT1 + $MIN_PT1/60 + $SEC_PT1/3600),2);
} 
elseif($direction_NSEW_PT1 == "N_W") {
$BEARING_RAD_PT1 = ROUND(DEG2RAD(-$DEG_PT1 + 360 + $MIN_PT1/60 + $SEC_PT1/3600),2);
}
elseif($direction_NSEW_PT1 == "S_E") {  
$BEARING_RAD_PT1 = ROUND(DEG2RAD(($SEC_PT1/60+$MIN_PT1)/3600 + (-$DEG_PT1 + 180)),2);
}
elseif($direction_NSEW_PT1 == "S_W") {
$BEARING_RAD_PT1 = ROUND(DEG2RAD($DEG_PT1 + 180 + $MIN_PT1/60 + $SEC_PT1/3600),2);
}

elseif ($direction_NSEW_PT1 == "DUE_E") {
$BEARING_RAD_PT1 = ROUND(DEG2RAD($DEG_PT1 + $MIN_PT1/60 + $SEC_PT1/3600),2);
} 
elseif($direction_NSEW_PT1 == "DUE_N") {
$BEARING_RAD_PT1 = ROUND(DEG2RAD(-$DEG_PT1 + 360 + $MIN_PT1/60 + $SEC_PT1/3600),2);
}
elseif($direction_NSEW_PT1 == "DUE_S") {  
$BEARING_RAD_PT1 = ROUND(DEG2RAD(($SEC_PT1/60+$MIN_PT1)/3600 + (-$DEG_PT1 + 180)),2);
}
elseif($direction_NSEW_PT1 == "DUE_W") {
$BEARING_RAD_PT1 = ROUND(DEG2RAD($DEG_PT1 + 180 + $MIN_PT1/60 + $SEC_PT1/3600),2);
}

$LAT_new1 = deg2rad($LAT_BLLM);
$LON_new1 = deg2rad($LON_BLLM);


$lat_bllm_NEW1 = asin(sin($LAT_new1) * cos($DISTANCE_PT1 / $earthRadius) + cos($LAT_new1) * sin($DISTANCE_PT1 / $earthRadius) * cos($BEARING_RAD_PT1));
$lon_bllm_NEW1 = $LON_new1 + atan2(sin($BEARING_RAD_PT1) * sin($DISTANCE_PT1 / $earthRadius) * cos($LAT_new1), cos($DISTANCE_PT1 / $earthRadius)- sin($LAT_new1) * sin($lat_bllm_NEW1));

//$lon_bllm_NEW = fmod($lon_bllm_NEW + 3*M_PI, 2*M_PI) - M_PI;
$LAT_PT1= ROUND(rad2deg($lat_bllm_NEW1),6);
$LON_PT1= ROUND(rad2deg($lon_bllm_NEW1),6);

//POINT 2
for($count_points=2;$count_points<=$NO_POINTS;$count_points++)
{

$direction_NSEW_PT = $_POST["direction_NSEW_PT$count_points"];
$BOUNDARY_PT = $_POST["BOUNDARY_PT$count_points"];
$DEG_PT = $_POST["DEG_PT$count_points"];
$MIN_PT = $_POST["MIN_PT$count_points"];
$SEC_PT = $_POST["MIN_PT$count_points"];
$DISTANCE_PT = $_POST["DISTANCE_PT$count_points"];
$BEARING_RAD_PT = $_POST["BEARING_RAD_PT$count_points"];


if ($direction_NSEW_PT == "N_E") {
$BEARING_RAD_PT = ROUND(DEG2RAD($DEG_PT + $MIN_PT/60 + $SEC_PT/3600),2);
} 
elseif($direction_NSEW_PT == "N_W") {
$BEARING_RAD_PT = ROUND(DEG2RAD(-$DEG_PT + 360 + $MIN_PT/60 + $SEC_PT/3600),2);
}
elseif($direction_NSEW_PT == "S_E") {  
$BEARING_RAD_PT = ROUND(DEG2RAD(($SEC_PT/60+$MIN_PT)/3600 + (-$DEG_PT + 180)),2);
}
elseif($direction_NSEW_PT == "S_W") {
$BEARING_RAD_PT = ROUND(DEG2RAD($DEG_PT + 180 + $MIN_PT/60 + $SEC_PT/3600),2);
}

elseif ($direction_NSEW_PT == "DUE_E") {
$BEARING_RAD_PT = ROUND(DEG2RAD($DEG_PT + $MIN_PT/60 + $SEC_PT/3600),2);
} 
elseif($direction_NSEW_PT == "DUE_N") {
$BEARING_RAD_PT = ROUND(DEG2RAD(-$DEG_PT + 360 + $MIN_PT/60 + $SEC_PT/3600),2);
}
elseif($direction_NSEW_PT == "DUE_S") {  
$BEARING_RAD_PT = ROUND(DEG2RAD(($SEC_PT/60+$MIN_PT)/3600 + (-$DEG_PT + 180)),2);
}
elseif($direction_NSEW_PT == "DUE_W") {
$BEARING_RAD_PT = ROUND(DEG2RAD($DEG_PT + 180 + $MIN_PT/60 + $SEC_PT/3600),2);
}

${'LAT_new'.$count_points} = deg2rad(${'LAT_PT'.$count_points-1});
${'LON_new'.$count_points} = deg2rad(${'LON_PT'.$count_points-1});


${'lat_bllm_NEW'.$count_points} = asin(sin(${'LAT_new'.$count_points}) * cos($DISTANCE_PT / $earthRadius) + cos(${'LAT_new'.$count_points}) * sin($DISTANCE_PT / $earthRadius) * cos($BEARING_RAD_PT));
${'lon_bllm_NEW'.$count_points} = ${'LON_new'.$count_points} + atan2(sin($BEARING_RAD_PT) * sin($DISTANCE_PT / $earthRadius) * cos(${'LAT_new'.$count_points}), cos($DISTANCE_PT / $earthRadius)- sin(${'LAT_new'.$count_points}) * sin(${'lat_bllm_NEW'.$count_points}));

${'LAT_PT'.$count_points}= ROUND(rad2deg(${'lat_bllm_NEW'.$count_points}),6);
${'LON_PT'.$count_points}= ROUND(rad2deg(${'lon_bllm_NEW'.$count_points}),6);

}

for($count_points=1;$count_points<=$NO_POINTS;$count_points++)
{
$LATCENTER += ${'LAT_PT'.$count_points}/$NO_POINTS;   
$LONCENTER += ${'LON_PT'.$count_points}/$NO_POINTS; 
} 

?>

var PATHID_BLLM = [
                {
                  "lat" : "<?php echo $LAT_84;?>",
                  "lng" : "<?php echo $LON_84;?>"
                },
                {
                  "lat" : "<?php echo $LAT_BLLM;?>",
                  "lng" : "<?php echo $LON_BLLM;?>"
                }
];

var PATHID_PT1 = [
                {
                  "lat" : "<?php echo $LAT_BLLM;?>",
                  "lng" : "<?php echo $LON_BLLM;?>"
                },
                {
                  "lat" : "<?php echo $LAT_PT1;?>",
                  "lng" : "<?php echo $LON_PT1;?>"
                }
];

var PATHID_CENTER = [
                {
                  "lat" : "<?php echo $LATCENTER;?>",
                  "lng" : "<?php echo $LONCENTER;?>"
                },

                {
                  "lat" : "<?php echo $LAT_BLLM;?>",
                  "lng" : "<?php echo $LON_BLLM;?>"
                }
                
];
<?php
for($count_points=2;$count_points<=$NO_POINTS;$count_points++)
{

  ?>
var PATHID_PT<?php echo $count_points;?> = [
                {
                  "lat" : "<?php echo ${'LAT_PT'.$count_points-1}?>",
                  "lng" : "<?php echo ${'LON_PT'.$count_points-1}?>"
                },
                {
                  "lat" : "<?php echo ${'LAT_PT'.$count_points}?>",
                  "lng" : "<?php echo ${'LON_PT'.$count_points}?>"
                }
];
<?php } ?>

         var latlang_bg = [[<?php for($count_points=1;$count_points<=$NO_POINTS;$count_points++){?>
  [<?php echo ${'LAT_PT'.$count_points}?>, <?php echo ${'LON_PT'.$count_points}?>],<?php } ?>]
         ];


<?php } } ?>
var map = L.map('map', {
  center: [<?php
    if(ISSET($_POST['submit_bllm'])){
        $KEY_PROV = $_POST['PROVINCE'];
        $KEY_TOWN = $_POST['MUNICIPALITY'];
        $KEY_STATION = $_POST['STATION_NAME'];
        require '../includes/conn_plot.php';
        $query = mysqli_query($conn_plot, "SELECT * FROM database_ws84 WHERE PROVINCE = '$KEY_PROV' AND MUNICIPALITY = '$KEY_TOWN' AND STATION_NAME = '$KEY_STATION' ") or die(mysqli_error());
        
while($fetch = mysqli_fetch_array($query)){
$LATITUDE_DEG = $fetch['LAT_84'];
$LONGITUDE_DEG = $fetch['LONG_84'];
$LAT_BLLM = $LAT_BLLM;
$LON_BLLM = $LON_BLLM;
$geographic =  $fetch['GEOGRAPHIC_TYPE'];

?>
<?php }

} 
$KEY_PROV = $_POST['PROVINCE'];
if($KEY_PROV !=''){
echo $LAT_BLLM.','.$LON_BLLM;
}

elseif ($KEY_PROV =''){
echo "-25.008623607831424, 134.2383377069487";
}

elseif ($KEY_PROV ='AA_EMPTY'){
echo "-83.66863058003031, 75.13146203132105";
}


else{
echo "14.5897839, 121.0388404";
}
?>],

  zoom: 22
});

<?php 
$KEY_PROV = $_POST['PROVINCE'];
if($KEY_PROV =='AA_EMPTY'){echo "var BRYANCALIPAYAN = L.tileLayer('http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}'";

}
else{
echo "var BRYANCALIPAYAN = L.tileLayer('http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}'";
}
?>
<?php
if ($geographic =='WGS 84'){
$geographic1 = 'https://gisgeography.com/wgs84-world-geodetic-system/';
$text_design = 'text-primary fw-bold';
}
else{
 $geographic1 = 'https://epsg.io/3123'; 
 $text_design = 'text-danger fw-bold';
}

?>
//var BRYANCALIPAYAN = L.tileLayer('http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}'
  ,{
  attribution: 'Map tiles by <a href="#"">Bryan A. Calipayan</a>, GEOGRAPHIC COORDINATES (<a class="<?php echo $text_design;?>" href="<?php echo $geographic1;?>"><?php echo $geographic;?></a>) &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 25,
  ext: 'png'
}).addTo(map);

<?php if(ISSET($_POST['submit_bllm'])){
        $KEY_PROV = $_POST['PROVINCE'];
        $KEY_TOWN = $_POST['MUNICIPALITY'];
        $KEY_STATION = $_POST['STATION_NAME'];
        require '../includes/conn_plot.php';
        $query = mysqli_query($conn_plot, "SELECT * FROM database_ws84 WHERE PROVINCE = '$KEY_PROV' AND MUNICIPALITY = '$KEY_TOWN' AND STATION_NAME = '$KEY_STATION' ") or die(mysqli_error());
        while($fetch = mysqli_fetch_array($query)){
?>
path_layer = L.polyline(PATHID_BLLM, {"weight": 1,"opacity": 1, "color": 'red'})
.setText('Zone: <?PHP echo $fetch['ZONE'];?> <?PHP echo $fetch['STATION_NAME'];?> <?PHP echo $fetch['BARANGAY'];?> <?php echo $_POST['BOUNDARY_BLLM'];?>', {
    repeat: false,
    style: 'z-index: 9999',
    attributes: {fill: 'white'},
    offset: -5,
    allowCrop: true,
    center: true
}).addTo(map);
//POINT 1
<?php
for($count_points=1;$count_points<=$NO_POINTS;$count_points++)
{ 
$BOUNDARY_PT = $_POST["BOUNDARY_PT$count_points"];
$DISTANCE_PT = $_POST["DISTANCE_PT$count_points"];
  ?>

path_layer = L.polyline(PATHID_PT<?php echo $count_points;?>, {"weight": 1.5,"opacity": 1, "color": "#696cff"})
.setText('<?php echo $BOUNDARY_PT;?>', {
    repeat: false,
    style: 'z-index: 9999',
    attributes: {fill: 'white'},
    offset: -5,
    allowCrop: true,
    center: true
}).addTo(map);

path_layer = L.polyline(PATHID_PT<?php echo $count_points;?>, {"weight": 3,"opacity": 1, "color": "#696cff"})
.setText('<?php echo $DISTANCE_PT;?>', {
    repeat: false,
    style: 'z-index: 9999',
    attributes: {fill: 'white'},
    offset: 15,
    allowCrop: true,
    center: true
}).addTo(map);

path_layer = L.polyline(PATHID_PT<?php echo $count_points;?>, {"weight": 0,"opacity": 1, "color": ""})
.setText('<?php echo $count_points;?>', {
    repeat: false,
    style: 'z-index: 9999',
    attributes: {fill: 'white'},
    offset: 3,
    allowCrop: true,
    center: false
}).addTo(map);

path_layer = L.polyline(PATHID_CENTER, {"weight": 5,"opacity": 1, "color": ""})
.setText('<?php echo round($total_pda,2)?> SQ. M.', {
    repeat: false,
    style: 'z-index: 9999',
    attributes: {fill: 'white','font-size': '14'},
    offset: 0,
    allowCrop: true,
    center: false
}).addTo(map);
<?php }?>
<?php } } ?>
var multiPolygonOptions = {color:'red', weight:1};
var multipolygon = L.multiPolygon(latlang_bg , multiPolygonOptions);
multipolygon.addTo(map);
</script>

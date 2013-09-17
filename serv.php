
  <?php
  require_once 'meekrodb.2.2.class.php';
  DB::$user = 'sql418301';
  DB::$password = 'bW7!iE3*';
  DB::$dbName = 'sql418301';
  //DB::$host ="sql4.freemysqlhosting.net";

  $update = (isset($_GET["update"]) ? $_GET["update"] : '0');
  if (!empty($_GET["sid"])){$sid = $_GET["sid"];}
  if (!empty($_GET["x"])){$x = $_GET["x"];}
  if (!empty($_GET["y"])){$y = $_GET["y"];}
  if (!empty($_GET["z"])){$z = $_GET["z"];}

  $res = DB::query("SELECT * FROM sessions WHERE sid=%i", $sid);
  if (!empty($res)){
    if ($update){
      DB::replace('sessions', array(
        'sid' => $sid,
        'x' => $x,
        'y' => $y,
        'z' => $z
      ));
      $res = DB::query("SELECT * FROM sessions WHERE sid=%i", $sid);
    }
    foreach ($res as $row) {
      echo '{"x": "'. $row['x'].'","y": "'. $row['y'].'","z": "'. $row['z'].'"}'; //return JSON like {"x": "7", "y": "8", "z": "2"}
    }
  } elseif (!empty($update) && $update){
    DB::insert('sessions', array(
      'sid' => $sid,
      'x' => $x,
      'y' => $y,
      'z' => $z
    ));
  }
  /*if($update){
    echo 'true';
  } else {
    echo 'false';
  }*/
  ?>
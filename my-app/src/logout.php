<?php
session_start();
//銷燬session
session_destroy();
//導到login.html
header("Location:login.js");
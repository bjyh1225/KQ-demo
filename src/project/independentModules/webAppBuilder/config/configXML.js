export const xmlStr = `
  <?xml version="1.0" encoding="UTF-8"?>
  <config custom="0"> 
    <theme name="default-blue" layout="scene_1_themeDefault"/>  
    <map init_extent="1526220.71 -2211258.85 19861360.23 8864182.95 " min_scale_id="4" full_extent="1526220.71 -2211258.85 19861360.23 8864182.95 " id="map"> 
      <scales> 
        <scale id="0">0.0000000016901635716026585738</scale>
        <scale id="1">0.0000000033803271432053171475</scale>
        <scale id="2">0.0000000067606542864106342951</scale>
        <scale id="3">0.0000000135213085728212685901</scale>
        <scale id="4">0.0000000270426171456425371803</scale>
        <scale id="5">0.0000000540852342912850743605</scale>
        <scale id="6">0.000000108170468582570148721</scale>
        <scale id="7">0.000000216340937165140297442</scale>
        <scale id="8">0.0000004326818743302805948841</scale>
        <scale id="9">0.0000008653637486605611897682</scale>
        <scale id="10">0.0000017307274973211223795364</scale>
        <scale id="11">0.0000034614549946422447590727</scale>
        <scale id="12">0.0000069229099892844895181455</scale>
        <scale id="13">0.0000138458199785689790362909</scale>
        <scale id="14">0.0000276916399571379580725819</scale>
        <scale id="15">0.0000553832799142759161451638</scale>
        <scale id="16">0.0001107665598285518322903276</scale>
        <scale id="17">0.0002215331196571036645806552</scale>
        <scale id="18">0.0004430662393142073291613103</scale>
        <scale id="19">0.0008861324786284146583226207</scale>
        <scale id="20">0.0017722649572568293166452413</scale>
        <scale id="21">0.0035445299145136586332904827</scale>
        <scale id="22">0.0070890598290273172665809653</scale>
        <scale id="23">0.0141781196580546345331619307</scale>
      </scales>  
      <projection>
        <prj>102100</prj>
        <proj4>+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs</proj4>
        <origin x="-20037625.34278925" y="20037464.34278925"></origin>
      </projection> 
    </map>  
    <controls>
      <control position="topright" type="toolbar">
        <subcontrol type="zoom_in"/>
        <subcontrol type="zoom_out"/>
        <subcontrol type="roaming"/>
        <subcontrol type="forward-map"/>
        <subcontrol type="backward-map"/>
        <subcontrol type="full-map"/>
        <subcontrol type="drawing"/>
      </control>
      <control fullscreen="1" position="topright" type="zoom"/>
      <control tooltip="KQ GEO" url="http://kqgeo.com.cn/" type="attribution" label="KQ GEO" img="../../images/logo.png"/>
      <control decimals="2" position="bottomleft" label_x="Lng" type="coordinates" label_y="Lat"/>
      <control position="bottomleft" type="scale"/>
      <control position="topleft" type="styleeditor"/>
      <control position="topright" type="compare"/>   
      <control type="basemap" position="topright" visible="0">
          <subcontrol name="高德矢量" maptype="gaode" subtype="vector" is_selected="1"></subcontrol>
          <subcontrol name="高德影像" maptype="gaode" subtype="image"></subcontrol>
      </control>
    </controls> 
    <tree label="Layer" icon="image_folder" select_max_count="50"> 
      <sources> 
      </sources>  
      <layers> 
      </layers> 
    </tree> 
  </config>
`
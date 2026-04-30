import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

function makeMarker(active, isDark) {
  const outer = active ? '#f43f5e' : '#6366f1';
  const inner = active ? '#fb7185' : '#a5b4fc';
  const glow  = active ? 'rgba(244,63,94,0.6)' : 'rgba(99,102,241,0.5)';
  const html = `
    <div style="position:relative;width:24px;height:24px;display:flex;align-items:center;justify-content:center;">
      <div style="position:absolute;width:${active ? 22 : 18}px;height:${active ? 22 : 18}px;border-radius:50%;background:${glow};animation:falconPing 1.4s cubic-bezier(0,0,0.2,1) infinite;"></div>
      <div style="position:relative;width:${active ? 14 : 10}px;height:${active ? 14 : 10}px;border-radius:50%;background:${inner};border:2px solid ${outer};box-shadow:0 0 8px ${glow};"></div>
    </div>
    <style>@keyframes falconPing{75%,100%{transform:scale(2);opacity:0}}</style>
  `;
  return L.divIcon({ html, className: '', iconSize: [24,24], iconAnchor: [12,12], popupAnchor: [0,-14] });
}

function FlyTo({ node }) {
  const map = useMap();
  useEffect(() => {
    if (node?.lat && node?.lng) map.flyTo([node.lat, node.lng], 13, { duration: 1.2 });
    else map.flyTo([23.685, 90.3563], 7, { duration: 1 });
  }, [node, map]);
  return null;
}

// Real thana/upazila coordinates for Bangladesh
// Key format: "District|Thana" (both lowercased for matching)
const THANA_COORDS = {
  // Bagerhat
  'bagerhat|bagerhat sadore':[22.6602,89.7854],'bagerhat|bagerhat sadar':[22.6602,89.7854],
  'bagerhat|chitalmari':[22.8136,89.6784],'bagerhat|chitolmari':[22.8136,89.6784],
  'bagerhat|fakirhat':[22.5830,89.8663],'bagerhat|kachua':[22.6022,89.8920],
  'bagerhat|kochua':[22.6022,89.8920],'bagerhat|mollarhat':[22.5130,89.8014],
  'bagerhat|moralgonj':[22.4769,89.8677],'bagerhat|morrelgonj':[22.4769,89.8677],
  'bagerhat|mullar hat':[22.5130,89.8014],'bagerhat|rampal':[22.6939,89.6906],
  // Barguna
  'barguna|amtoli':[22.0833,90.2167],'barguna|barguna sadore':[22.1524,90.1255],
  'barguna|barguna sadar':[22.1524,90.1255],
  // Barishal
  'barishal|babugonj':[22.7697,90.3453],'barishal|bakherganj':[22.5500,90.2333],
  'barishal|banaripara':[22.6500,90.2000],'barishal|charkawa':[22.7100,90.3800],
  'barishal|gaurnadi':[22.8000,90.2667],'barishal|gournadi':[22.8000,90.2667],
  'barishal|mehendiganj':[22.5667,90.5167],'barishal|muladi':[22.6333,90.2167],
  'barishal|sadar':[22.7010,90.3535],'barishal|satmail':[22.6900,90.3900],
  'barishal|uzirpur':[22.8167,90.3833],
  // Bhola
  'bhola|bhola sadar':[22.6876,90.6484],'bhola|burhanuddin':[22.8167,90.7167],
  'bhola|char fashon':[22.2333,90.7500],'bhola|lalmohon':[22.5333,90.7500],
  // Bogura / Bogra
  'bogura|adamdighi':[24.7167,89.4833],'bogura|dupchacia':[24.8500,89.5000],
  'bogura|gabtali':[24.6833,89.3333],'bogura|kahallu':[24.7500,89.2167],
  'bogura|nandigram':[24.6500,89.4833],'bogura|sadore':[24.8465,89.3778],
  'bogura|shajahanpur':[24.8000,89.3333],'bogura|sherpur':[24.6000,89.4167],
  'bogura|shibgonj':[24.8833,89.2833],'bogra|shibgonj':[24.8833,89.2833],
  // Chandpur
  'chandpur|chandpur sadar':[23.2333,90.8500],'chandpur|faridgong':[23.1500,90.7333],
  'chandpur|hajigonj':[23.2500,90.8500],'chandpur|kachua':[23.3500,90.9833],
  'chandpur|motlab':[23.3000,90.7167],'chandpur|shahrasti':[23.1833,90.9500],
  // Chuadanga
  'chuadanga|chudanga sadar':[23.6401,88.8416],'chuadanga|pachmail':[23.5833,89.0000],
  // Comilla / Cumilla
  'comilla|comilla sadar':[23.4607,91.1809],'comilla|sadar':[23.4607,91.1809],
  // Cox's Bazar
  "cox's bazar|cox's bazar sadar":[21.4272,92.0058],'coxs bazar|sadar':[21.4272,92.0058],
  // Dhaka
  'dhaka|dhanmondi':[23.7461,90.3742],'dhaka|mirpur':[23.8041,90.3652],
  'dhaka|mohammadpur':[23.7625,90.3564],'dhaka|uttara':[23.8759,90.3795],
  'dhaka|sadar':[23.8103,90.4125],
  // Dinajpur
  'dinajpur|birgonj':[25.8500,88.6500],'dinajpur|chirir bandar':[25.8667,88.8167],
  'dinajpur|chirirbondar':[25.8667,88.8167],'dinajpur|kaharoli':[25.8000,88.5667],
  'dinajpur|khansama':[25.8833,88.6000],'dinajpur|kotwali':[25.6279,88.6331],
  // Faridpur
  'faridpur|alfadanga':[23.4833,89.6833],'faridpur|boalmari':[23.4333,89.7833],
  'faridpur|magura sadar':[23.4833,89.4167],'faridpur|modhukhali':[23.5500,89.6167],
  'faridpur|nagarkanda':[23.4667,89.7500],'faridpur|sadar':[23.6070,89.8429],
  'faridpur|sador':[23.6070,89.8429],'faridpur|vanga':[23.5167,89.8500],
  // Feni
  'feni|feni':[23.0236,91.3960],'feni|sadar':[23.0236,91.3960],
  // Gaibandha
  'gaibandha|gaibandha sador':[25.3288,89.5446],'gaibandha|gobindagon':[25.2667,89.3833],
  'gaibandha|gobindaganj':[25.2667,89.3833],
  // Gopalgonj / Gopalganj
  'gopalgonj|gopalgonj  sadar':[23.0046,89.8264],'gopalgonj|kashiani':[23.0833,89.9000],
  'gopalgonj|kotalipara':[22.9667,90.0333],'gopalgonj|moksudpar':[22.9167,89.7333],
  'gopalgonj|moksudpur':[22.9167,89.7333],'gopalgonj|muksudpur':[22.9167,89.7333],
  'gopalgonj|sadar':[23.0046,89.8264],'gopalgonj|tungipara':[22.9667,89.9167],
  'gopalgonj|kotalipara':[22.9667,90.0333],
  // Jamalpur
  'jamalpur|sadar':[24.9000,89.9377],'jamalpur|jamalpur':[24.9000,89.9377],
  // Jashore / Jessore
  'jashore|abhoynagar':[23.0333,89.4000],'jashore|avaynagar':[23.0333,89.4000],
  'jashore|bagharpara':[23.2000,89.3000],'jashore|bagherpara':[23.2000,89.3000],
  'jashore|chaugacha':[23.1167,88.8167],'jashore|jhikorgacha':[23.1833,89.1167],
  'jashore|kaligonj':[23.2000,89.1667],'jashore|sadar':[23.1667,89.2167],
  'jashore|sharsha':[23.0667,88.9333],
  // Jhalokati
  'jhalokati|jhalokati sadar':[22.6400,90.2021],'jhalokati|sadar':[22.6400,90.2021],
  // Jhenaidah
  'jhenaidah|sadar':[23.5450,89.1540],'jhenaidah|jhenaidah':[23.5450,89.1540],
  // Khulna
  'khulna|khalishpur':[22.8286,89.5279],'khulna|khan jahan ali':[22.8000,89.5500],
  'khulna|paikgacha':[22.5667,89.3333],'khulna|paikgasa':[22.5667,89.3333],
  'khulna|paikghacha':[22.5667,89.3333],'khulna|phultala':[22.8000,89.4833],
  'khulna|rupsha':[22.7333,89.5500],'khulna|sadar':[22.8456,89.5403],
  'khulna|sonadanga':[22.8167,89.5333],'khulna|terokhada':[22.9167,89.6167],
  // Kishoreganj
  'kishoreganj|sadar':[24.4445,90.7766],'kishoreganj|kishoreganj':[24.4445,90.7766],
  // Kurigram
  'kurigram|rajarhat':[25.8500,89.5833],'kurigram|sadar':[25.8072,89.6363],
  // Kushtia
  'kushtia|barokhada':[23.9500,89.1167],'kushtia|bheramara':[24.0333,89.0000],
  'kushtia|charpara':[23.8833,89.1167],'kushtia|kushtia sadar':[23.9010,89.1210],
  'kushtia|mirpur':[23.9333,89.0667],'kushtia|veramara':[24.0333,89.0000],
  // Laksmipur / Lakshmipur
  'laksmipur|faridganj':[23.2167,90.8667],'laksmipur|kamol nagor':[22.9000,90.8000],
  'laksmipur|laxmipur sadar':[22.9425,90.8283],'laksmipur|noakhali':[22.8696,91.0996],
  'laksmipur|ramgonj':[23.0833,90.7833],'laksmipur|ramgoti':[22.7833,90.9167],
  // Lalmonirhat
  'lalmonirhat|lalmonirhat sadar':[25.9923,89.2847],'lalmonirhat|sadar':[25.9923,89.2847],
  // Madaripur
  'madaripur|madaripur sadar':[23.1642,90.1987],'madaripur|rajoir':[23.0667,90.0167],
  'madaripur|shibchar':[23.2333,90.3667],
  // Magura
  'magura|magura':[23.4873,89.4192],'magura|magura sadar':[23.4873,89.4192],
  'magura|shalikha':[23.3833,89.4833],'magura|sreepur':[23.5167,89.3833],
  // Meherpur
  'meherpur|meherpur':[23.7622,88.6318],'meherpur|sadar':[23.7622,88.6318],
  // Munshiganj
  'munshiganj|sadar':[23.5422,90.5300],'munshiganj|munshiganj':[23.5422,90.5300],
  // Mymensingh
  'mymensingh|fulbaria':[24.5167,90.3167],'mymensingh|gafargaon':[24.4167,90.5167],
  'mymensingh|goforfaon':[24.4167,90.5167],'mymensingh|mymensingh':[24.7471,90.4203],
  'mymensingh|nandail':[24.4500,90.7500],'mymensingh|rasulpur':[24.6500,90.3000],
  'mymensingh|sadar.':[24.7471,90.4203],'mymensingh|sadar':[24.7471,90.4203],
  'mymensingh|tarakanda':[24.6667,90.5667],'mymensingh|trisal':[24.5333,90.3500],
  // Narayanganj
  'narayanganj|sadar':[23.6238,90.4966],'narayanganj|narayanganj':[23.6238,90.4966],
  // Narsingdi
  'narsingdi|sadar':[23.9223,90.7148],'narsingdi|narsingdi':[23.9223,90.7148],
  // Natore
  'natore|natore sadore':[24.4200,89.0000],'natore|sadar':[24.4200,89.0000],
  'natore|singra':[24.4833,89.1167],
  // Netrokona
  'netrokona|netrokona':[24.8697,90.7276],'netrokona|shamgonj':[24.8000,90.6500],
  'netrokona|sadar':[24.8697,90.7276],
  // Nilphamari
  'nilphamari|neamathpur':[25.8333,88.9000],'nilphamari|nilphamari':[25.9312,88.8563],
  'nilphamari|sadar':[25.9312,88.8563],
  // Noakhali
  'noakhali|begumgonj':[22.9833,91.1167],'noakhali|chorkawnia':[22.8000,91.1500],
  'noakhali|companigonj':[22.9667,91.2167],'noakhali|hatia':[22.4667,91.1167],
  'noakhali|kobirhat':[22.8667,91.2000],'noakhali|noakhali':[22.8696,91.0996],
  'noakhali|senbug':[23.0333,91.1333],
  // Norail / Narail
  'norail|kalia':[23.2167,89.6667],'norail|lohagara':[23.1833,89.7833],
  'norail|norail sadar':[23.1726,89.5120],'norail|sadare':[23.1726,89.5120],
  // Pabna
  'pabna|ishordi':[24.1333,89.0667],'pabna|sadar, pabna':[24.0063,89.2472],
  'pabna|sathia':[24.0667,89.4167],'pabna|sujanagar':[23.9000,89.3833],
  // Panchagar / Panchagarh
  'panchagar|panchagar':[26.3408,88.5556],'panchagar|tetulia':[26.4833,88.5833],
  // Patuakhali
  'patuakhali|bauphal':[22.4500,90.4500],'patuakhali|dashmina':[22.3000,90.4333],
  'patuakhali|kolapara':[22.0333,90.3667],'patuakhali|mirzagonj':[22.4333,90.2667],
  'patuakhali|sadar':[22.3605,90.3298],
  // Pirojpur
  'pirojpur|kawkhali':[22.5333,90.0833],'pirojpur|nesarabad':[22.6333,90.0833],
  'pirojpur|pirojopur sadar':[22.5797,89.9748],'pirojpur|rajapur':[22.5167,89.9500],
  'pirojpur|swarupkathi':[22.6333,90.0833],'pirojpur|vandaria':[22.4167,89.9167],
  // Rajbari
  'rajbari|pangsha':[23.8000,89.6333],'rajbari|rajbari sadore':[23.7576,89.6439],
  'rajbari|sadar':[23.7576,89.6439],
  // Rajshahi
  'rajshahi|bualia':[24.3636,88.6241],'rajshahi|chapai                   nobabgong':[24.5965,88.2778],
  'rajshahi|charghat':[24.2167,88.8500],'rajshahi|godagari':[24.4833,88.3667],
  'rajshahi|puthia':[24.3500,88.8500],'rajshahi|puthiya':[24.3500,88.8500],
  'rajshahi|rajshahi':[24.3636,88.6241],'rajshahi|rajshahi sadore':[24.3636,88.6241],
  // Rangpur / RANGPUR
  'rangpur|badorgonj':[25.6833,89.0500],'rangpur|birgonj':[25.8500,88.6500],
  'rangpur|kauniar':[25.6167,89.1500],'rangpur|mitapukur':[25.5500,89.1333],
  'rangpur|mitha pukur':[25.5500,89.1333],'rangpur|pirgasa':[25.8333,89.2167],
  'rangpur|pirgonj':[25.8500,89.1667],'rangpur|rangpur':[25.7439,89.2752],
  'rangpur|rangpur sadore':[25.7439,89.2752],
  // Satkhira
  'satkhira|kaligonj':[22.3667,89.1333],'satkhira|kolarua':[22.6333,89.0833],
  'satkhira|patkelghata':[22.6167,89.3500],'satkhira|pattorghata':[22.6167,89.3500],
  'satkhira|satkhira':[22.7185,89.0705],'satkhira|satkhira sadar':[22.7185,89.0705],
  'satkhira|shamnagor':[21.9833,89.0167],
  // Shariatpur
  'shariatpur|palong':[23.1833,90.5000],'shariatpur|shariatpur sadore':[23.2421,90.4349],
  // Sherpur
  'sherpur|sherpur sadore':[25.0215,90.0162],'sherpur|sadar':[25.0215,90.0162],
  // Sirajgonj / Sirajganj
  'sirajgonj|baghabari':[24.2000,89.7500],'sirajgonj|belkuchi':[24.3833,89.6167],
  'sirajgonj|kamarkhand':[24.3000,89.5500],'sirajgonj|shahjatpur':[24.5000,89.7167],
  'sirajgonj|tarash':[24.1833,89.5333],
  // Tangail
  'tangail|bashail':[24.2000,90.0167],'tangail|bhuapur':[24.4833,89.8000],
  'tangail|delduar':[24.1000,89.9667],'tangail|gopalpur':[24.5167,90.0333],
  'tangail|hamidpur':[24.4333,89.9833],'tangail|kalihathi':[24.2833,89.9833],
  'tangail|kalihati':[24.2833,89.9833],'tangail|mirzapur':[24.0833,90.0500],
  'tangail|sadar':[24.2512,89.9167],'tangail|tangail':[24.2512,89.9167],
  // Thakurgaon
  'thakurgaon|pirgonj':[25.8833,88.3833],'thakurgaon|thakurgaon':[26.0424,88.4283],
  'thakurgaon|sadar':[26.0424,88.4283],
  // Gazipur
  'gazipur|sadar':[23.9999,90.4203],'gazipur|gazipur':[23.9999,90.4203],
  'gazipur|kaliakair':[24.0833,90.2167],'gazipur|kapasia':[24.1333,90.6000],
  // Naogaon
  'naogaon|sadar':[24.7936,88.9312],'naogaon|naogaon':[24.7936,88.9312],
  // Chapainawabganj
  'chapainawabganj|sadar':[24.5965,88.2778],
  // Sylhet
  'sylhet|sadar':[24.8949,91.8687],'sylhet|sylhet':[24.8949,91.8687],
  // Habiganj
  'habiganj|sadar':[24.3745,91.4153],'habiganj|habiganj':[24.3745,91.4153],
  // Moulvibazar
  'moulvibazar|sadar':[24.4829,91.7774],'moulvibazar|moulvibazar':[24.4829,91.7774],
  // Sunamganj
  'sunamganj|sadar':[25.0658,91.3950],'sunamganj|sunamganj':[25.0658,91.3950],
  // Brahmanbaria
  'brahmanbaria|sadar':[23.9608,91.1115],'brahmanbaria|brahmanbaria':[23.9608,91.1115],
  // Manikganj
  'manikganj|sadar':[23.8640,90.0025],'manikganj|manikganj':[23.8640,90.0025],
  // Joypurhat
  'joypurhat|sadar':[25.0969,89.0224],'joypurhat|joypurhat':[25.0969,89.0224],
  // Lalmonirhat
  'lalmonirhat|lalmonirhat':[25.9923,89.2847],
  // Jhalakathi (note different spelling in data)
  'jhalakathi|nalcity':[22.6250,90.1900],'jhalakathi|nolcity':[22.6250,90.1900],
  'jhalakathi|razapur':[22.5800,90.1500],'jhalakathi|sadar':[22.6400,90.2021],
  // Jhenaidah extra thanas
  'jhenaidah|jhenaidhah':[23.5450,89.1540],'jhenaidah|kaligonj':[23.2000,89.1667],
  'jhenaidah|kotalipara':[23.4167,89.0833],'jhenaidah|kotchanpur':[23.6833,89.0500],
  'jhenaidah|ratanhat':[23.4833,89.2167],'jhenaidah|shailkupa':[23.6500,89.2667],
  'jhenaidah|shailokopa':[23.6500,89.2667],
  // Jashore / Jessore extra
  'jashore|noapara':[23.1000,89.3667],'jessore|chowgacha':[23.1167,88.8167],
  // Khulna extra (uppercase KHULNA variant + more upazilas)
  'khulna|batiaghata':[22.8833,89.6000],'khulna|dacope':[22.6167,89.4667],
  'khulna|dacup':[22.6167,89.4667],'khulna|daulatpur':[22.8667,89.5333],
  'khulna|digholia':[22.9667,89.4667],'khulna|dumuria':[22.8167,89.4167],
  'khulna|tala':[22.7333,89.2000],
};

// District fallback coordinates
const DISTRICT_BASE = {
  'Dhaka':[23.8103,90.4125],'Chattogram':[22.3569,91.7832],'Khulna':[22.8456,89.5403],
  'Barishal':[22.7010,90.3535],'Sylhet':[24.8949,91.8687],'Rajshahi':[24.3636,88.6241],
  'Rangpur':[25.7439,89.2752],'RANGPUR':[25.7439,89.2752],'Mymensingh':[24.7471,90.4203],
  'Barguna':[22.1524,90.1255],'Patuakhali':[22.3605,90.3298],'Bogura':[24.8465,89.3778],
  'Bogra':[24.8465,89.3778],'Comilla':[23.4607,91.1809],'Noakhali':[22.8696,91.0996],
  'Feni':[23.0236,91.3960],"Cox's Bazar":[21.4272,92.0058],'Gazipur':[23.9999,90.4203],
  'Narayanganj':[23.6238,90.4966],'Manikganj':[23.8640,90.0025],'Narsingdi':[23.9223,90.7148],
  'Tangail':[24.2512,89.9167],'Kishoreganj':[24.4445,90.7766],'Faridpur':[23.6070,89.8429],
  'Madaripur':[23.1642,90.1987],'Shariatpur':[23.2421,90.4349],'Gopalganj':[23.0046,89.8264],
  'Gopalgonj':[23.0046,89.8264],'Munshiganj':[23.5422,90.5300],'Rajbari':[23.7576,89.6439],
  'Chandpur':[23.2513,90.8517],'Lakshmipur':[22.9425,90.8283],'Laksmipur':[22.9425,90.8283],
  'Brahmanbaria':[23.9608,91.1115],'Habiganj':[24.3745,91.4153],'Moulvibazar':[24.4829,91.7774],
  'Sunamganj':[25.0658,91.3950],'Netrokona':[24.8697,90.7276],'Jamalpur':[24.9000,89.9377],
  'Sherpur':[25.0215,90.0162],'Dinajpur':[25.6279,88.6331],'Gaibandha':[25.3288,89.5446],
  'Kurigram':[25.8072,89.6363],'Lalmonirhat':[25.9923,89.2847],'Nilphamari':[25.9312,88.8563],
  'Panchagarh':[26.3408,88.5556],'Panchagar':[26.3408,88.5556],'Thakurgaon':[26.0424,88.4283],
  'Joypurhat':[25.0969,89.0224],'Naogaon':[24.7936,88.9312],'Natore':[24.4200,89.0000],
  'Chapainawabganj':[24.5965,88.2778],'Pabna':[24.0063,89.2472],'Sirajganj':[24.4503,89.7001],
  'Sirajgonj':[24.4503,89.7001],'Bagerhat':[22.6602,89.7854],'Chuadanga':[23.6401,88.8416],
  'Jashore':[23.1667,89.2167],'Jessore':[23.1667,89.2167],'Jhenaidah':[23.5450,89.1540],
  'Magura':[23.4873,89.4192],'Meherpur':[23.7622,88.6318],'Narail':[23.1726,89.5120],
  'Norail':[23.1726,89.5120],'Satkhira':[22.7185,89.0705],'Bhola':[22.6860,90.6479],
  'Jhalokati':[22.6400,90.2021],'Pirojpur':[22.5797,89.9748],'Kushtia':[23.9010,89.1210],
};

// Bangladesh strict geographic bounds
const BD_BOUNDS = { latMin: 20.74, latMax: 26.63, lngMin: 88.01, lngMax: 92.67 };
function clampBD(lat, lng) {
  return [
    Math.max(BD_BOUNDS.latMin, Math.min(BD_BOUNDS.latMax, lat)),
    Math.max(BD_BOUNDS.lngMin, Math.min(BD_BOUNDS.lngMax, lng)),
  ];
}

function getLatLng(id, district, thana) {
  // Try exact thana match first
  if (district && thana) {
    const key = `${district.toLowerCase().trim()}|${thana.toLowerCase().trim()}`;
    if (THANA_COORDS[key]) return clampBD(...THANA_COORDS[key]);
    // Try partial match — pick the longest matching key to avoid false hits
    const distLow = district.toLowerCase().trim();
    const thanaLow = thana.toLowerCase().trim();
    let bestKey = null, bestLen = 0;
    for (const k of Object.keys(THANA_COORDS)) {
      const pipe = k.indexOf('|');
      const kd = k.slice(0, pipe), kt = k.slice(pipe + 1);
      if (kd === distLow && (kt.includes(thanaLow) || thanaLow.includes(kt)) && kt.length > bestLen) {
        bestLen = kt.length; bestKey = k;
      }
    }
    if (bestKey) return clampBD(...THANA_COORDS[bestKey]);
  }
  // Fall back to district center + tiny deterministic spread (±0.04°, ~4 km)
  const c = (district && DISTRICT_BASE[district]) || [23.685, 90.3563];
  const n1 = Math.sin(id * 12.9898) * 43758.5453;
  const n2 = Math.sin(id * 78.233)  * 43758.5453;
  return clampBD(c[0] + (n1 - Math.floor(n1)) * 0.08 - 0.04, c[1] + (n2 - Math.floor(n2)) * 0.08 - 0.04);
}

// Client location → [lat, lng] lookup (Dhaka neighborhoods + districts)
const CLIENT_LOCATION_COORDS = {
  'Aftabnagar':   [23.7500, 90.4333], 'Agargaon':     [23.7773, 90.3714],
  'Ashulia':      [23.8940, 90.2880], 'B.Baria':      [23.9608, 91.1115],
  'Badda':        [23.7810, 90.4333], 'Bagerhath':    [22.6602, 89.7854],
  'Bagura':       [24.8465, 89.3778], 'Banani':       [23.7938, 90.4065],
  'Barguna':      [22.1524, 90.1255], 'Baridhara':    [23.8010, 90.4214],
  'Barishal':     [22.7010, 90.3535], 'Basundhara':   [23.8283, 90.4278],
  'Bhola':        [22.6860, 90.6479], 'Bogra':        [24.8465, 89.3778],
  'Bypass':       [23.7200, 90.4100], 'Chadpur':      [23.2333, 90.8500],
  'Chittagong':   [22.3569, 91.7832], 'Comilla':      [23.4607, 91.1809],
  'Cumilla':      [23.4607, 91.1809], 'Dhanmondi':    [23.7461, 90.3742],
  'Dinajpur':     [25.6279, 88.6331], 'Feni':         [23.0236, 91.3960],
  'Gazipur':      [23.9999, 90.4203], 'Ghorashal':    [24.0500, 90.6333],
  'Gopalgonj':    [23.0046, 89.8264], 'Gulshan':      [23.7925, 90.4078],
  'Gulshan-1':    [23.7866, 90.4101], 'Gulshan-2':    [23.7989, 90.4152],
  'Hatirpul':     [23.7428, 90.3900], 'Indira Road':  [23.7551, 90.3833],
  'Jamalpur':     [24.9000, 89.9377], 'Jessore':      [23.1667, 89.2167],
  'Jhenaidah':    [23.5450, 89.1540], 'Kalabagan':    [23.7500, 90.3722],
  'Kamlapur':     [23.7333, 90.4278], 'Khulna':       [22.8456, 89.5403],
  'Kishorganj':   [24.4445, 90.7766], 'Kulaura':      [24.5333, 92.0333],
  'Kushtia':      [23.9010, 89.1210], 'Mirpur':       [23.8041, 90.3652],
  'Moghbazar':    [23.7500, 90.4000], 'Mohakhali':    [23.7810, 90.4025],
  'Mohammadpur':  [23.7625, 90.3564], 'Motijheel':    [23.7333, 90.4167],
  'Munshiganj':   [23.5422, 90.5300], 'Mymensing':    [24.7471, 90.4203],
  'Narayanganj':  [23.6238, 90.4966], 'Narayangonj':  [23.6238, 90.4966],
  'Narsingdi':    [23.9223, 90.7148], 'Nawabpur':     [23.7194, 90.4086],
  'Niketon':      [23.7797, 90.4108], 'Noakhali':     [22.8696, 91.0996],
  'Norshindi':    [23.9223, 90.7148], 'Nougoan':      [24.7936, 88.9312],
  'Patuakhali':   [22.3605, 90.3298], 'Pubail':       [23.8667, 90.5167],
  'Rajshahi':     [24.3636, 88.6241], 'Rangpur':      [25.7439, 89.2752],
  'Satarkul':     [23.8167, 90.4500], 'Savar':        [23.8581, 90.2666],
  'Shamoly':      [23.7699, 90.3580], 'Shewrapara':   [23.8000, 90.3600],
  'Sirajgonj':    [24.4503, 89.7001], 'Sreemangal':   [24.3075, 91.7280],
  'Sylhet':       [24.8949, 91.8687], 'Tangail':      [24.2512, 89.9167],
  'Tejgaon':      [23.7651, 90.3944], 'Tejgoan':      [23.7651, 90.3944],
  'Tongi':        [23.8897, 90.4000], 'Uttara':       [23.8759, 90.3795],
  'Valuka':       [24.3667, 90.4000], 'Vulta':        [23.8333, 90.5833],
  'Wari':         [23.7200, 90.4186],
};

function makeClientMarker(isDark) {
  const outer = '#10b981';
  const inner = '#6ee7b7';
  const glow  = 'rgba(16,185,129,0.55)';
  const html = `
    <div style="position:relative;width:20px;height:20px;display:flex;align-items:center;justify-content:center;">
      <div style="position:absolute;width:16px;height:16px;border-radius:50%;background:${glow};animation:falconPing 2s cubic-bezier(0,0,0.2,1) infinite;"></div>
      <div style="position:relative;width:9px;height:9px;border-radius:50%;background:${inner};border:2px solid ${outer};box-shadow:0 0 6px ${glow};"></div>
    </div>
    <style>@keyframes falconPing{75%,100%{transform:scale(2);opacity:0}}</style>
  `;
  return L.divIcon({ html, className: '', iconSize: [20,20], iconAnchor: [10,10], popupAnchor: [0,-12] });
}

export default function BangladeshMap({ data = [], clientData = [], selectedNode = null, onSelectNode, isDark = true }) {
  const nodes = data.map(n => {
    const [lat, lng] = getLatLng(n.id, n.district, n.thana);
    return { ...n, lat, lng };
  });

  const tileUrl = isDark
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

  const popupBg   = isDark ? '#0f172a' : '#ffffff';
  const popupText = isDark ? '#e2e8f0' : '#0f172a';
  const popupSub  = isDark ? '#94a3b8' : '#64748b';
  const popupBorder = isDark ? 'rgba(100,116,139,0.3)' : 'rgba(148,163,184,0.35)';

  const serviceColor = t => t === '24 Hrs SG' ? '#34d399' : t === '12 Hrs SG' ? '#818cf8' : '#a78bfa';

  return (
    <MapContainer center={[23.685, 90.3563]} zoom={7}
      className="w-full h-full" style={{ minHeight: '100%', background: isDark ? '#0d1117' : '#e8edf5' }}
      zoomControl={false}>
      <TileLayer attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>' url={tileUrl} />
      <FlyTo node={nodes.find(n => n.id === selectedNode?.id) || selectedNode} />
      {nodes.map(n => {
        const active = selectedNode?.id === n.id;
        return (
          <Marker key={n.id} position={[n.lat, n.lng]} icon={makeMarker(active, isDark)}
            eventHandlers={{ click: () => onSelectNode?.(n) }}>
            <Popup>
              <div style={{ minWidth: 180, fontFamily: 'sans-serif', background: popupBg,
                border: `1px solid ${popupBorder}`, borderRadius: 10, padding: '10px 12px', color: popupText }}>
                <p style={{ fontWeight: 700, fontSize: 12, color: serviceColor(n.serviceType), marginBottom: 4 }}>
                  {n.airtelCode || n.robiCode || `BTS #${n.slNo}`}
                </p>
                <p style={{ fontSize: 11, color: popupSub, marginBottom: 6, lineHeight: 1.4 }}>{n.address}</p>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 999,
                    background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#818cf8',
                    textTransform: 'uppercase', letterSpacing: '0.05em' }}>{n.siteType || 'N/A'}</span>
                  <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 999,
                    background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#34d399',
                    textTransform: 'uppercase', letterSpacing: '0.05em' }}>{n.persons} Guards</span>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
      {clientData.map(c => {
        const coords = CLIENT_LOCATION_COORDS[c.location];
        if (!coords) return null;
        const [lat, lng] = clampBD(...coords);
        return (
          <Marker key={`client-${c.id}`} position={[lat, lng]} icon={makeClientMarker(isDark)}>
            <Popup>
              <div style={{ minWidth: 180, fontFamily: 'sans-serif', background: popupBg,
                border: `1px solid ${popupBorder}`, borderRadius: 10, padding: '10px 12px', color: popupText }}>
                <p style={{ fontWeight: 700, fontSize: 12, color: '#34d399', marginBottom: 4 }}>{c.name}</p>
                <p style={{ fontSize: 11, color: popupSub, marginBottom: 4, lineHeight: 1.4 }}>{c.address}</p>
                {c.contactPerson && <p style={{ fontSize: 10, color: '#6ee7b7' }}>👤 {c.contactPerson}</p>}
                {c.contactNo    && <p style={{ fontSize: 10, fontFamily: 'monospace', color: '#34d399', marginTop: 2 }}>📞 {c.contactNo}</p>}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

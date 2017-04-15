var React = require('react');
var {
  View, ListView, Text, TouchableHighlight, TextInput, Image, PixelRatio
} = require('react-native')

var WidgetMixin = require('../mixins/WidgetMixin.js');
var OptionWidget = require('./OptionWidget.js');

// countries list from https://www.iso.org/obp/ui/#search
var countries =
[{"name": "Afghanistan", "alpha2": "AF", "alpha3": "AFG", "numeric": 4},
{"name": "Åland Islands", "alpha2": "AX", "alpha3": "ALA", "numeric": 248},
{"name": "Albania", "alpha2": "AL", "alpha3": "ALB", "numeric": 8},
{"name": "Algeria", "alpha2": "DZ", "alpha3": "DZA", "numeric": 12},
{"name": "American Samoa", "alpha2": "AS", "alpha3": "ASM", "numeric": 16},
{"name": "Andorra", "alpha2": "AD", "alpha3": "AND", "numeric": 20},
{"name": "Angola", "alpha2": "AO", "alpha3": "AGO", "numeric": 24},
{"name": "Anguilla", "alpha2": "AI", "alpha3": "AIA", "numeric": 660},
{"name": "Antarctica", "alpha2": "AQ", "alpha3": "ATA", "numeric": 10},
{"name": "Antigua and Barbuda", "alpha2": "AG", "alpha3": "ATG", "numeric": 28},
{"name": "Argentina", "alpha2": "AR", "alpha3": "ARG", "numeric": 32},
{"name": "Armenia", "alpha2": "AM", "alpha3": "ARM", "numeric": 51},
{"name": "Aruba", "alpha2": "AW", "alpha3": "ABW", "numeric": 533},
{"name": "Australia", "alpha2": "AU", "alpha3": "AUS", "numeric": 36},
{"name": "Austria", "alpha2": "AT", "alpha3": "AUT", "numeric": 40},
{"name": "Azerbaijan", "alpha2": "AZ", "alpha3": "AZE", "numeric": 31},
{"name": "Bahamas (the)", "alpha2": "BS", "alpha3": "BHS", "numeric": 44},
{"name": "Bahrain", "alpha2": "BH", "alpha3": "BHR", "numeric": 48},
{"name": "Bangladesh", "alpha2": "BD", "alpha3": "BGD", "numeric": 50},
{"name": "Barbados", "alpha2": "BB", "alpha3": "BRB", "numeric": 52},
{"name": "Belarus", "alpha2": "BY", "alpha3": "BLR", "numeric": 112},
{"name": "Belgium", "alpha2": "BE", "alpha3": "BEL", "numeric": 56},
{"name": "Belize", "alpha2": "BZ", "alpha3": "BLZ", "numeric": 84},
{"name": "Benin", "alpha2": "BJ", "alpha3": "BEN", "numeric": 204},
{"name": "Bermuda", "alpha2": "BM", "alpha3": "BMU", "numeric": 60},
{"name": "Bhutan", "alpha2": "BT", "alpha3": "BTN", "numeric": 64},
{"name": "Bolivia (Plurinational State of)", "alpha2": "BO", "alpha3": "BOL", "numeric": 68},
{"name": "Bonaire, Sint Eustatius and Saba", "alpha2": "BQ", "alpha3": "BES", "numeric": 535},
{"name": "Bosnia and Herzegovina", "alpha2": "BA", "alpha3": "BIH", "numeric": 70},
{"name": "Botswana", "alpha2": "BW", "alpha3": "BWA", "numeric": 72},
{"name": "Bouvet Island", "alpha2": "BV", "alpha3": "BVT", "numeric": 74},
{"name": "Brazil", "alpha2": "BR", "alpha3": "BRA", "numeric": 76},
{"name": "British Indian Ocean Territory (the)", "alpha2": "IO", "alpha3": "IOT", "numeric": 86},
{"name": "Brunei Darussalam", "alpha2": "BN", "alpha3": "BRN", "numeric": 96},
{"name": "Bulgaria", "alpha2": "BG", "alpha3": "BGR", "numeric": 100},
{"name": "Burkina Faso", "alpha2": "BF", "alpha3": "BFA", "numeric": 854},
{"name": "Burundi", "alpha2": "BI", "alpha3": "BDI", "numeric": 108},
{"name": "Cabo Verde", "alpha2": "CV", "alpha3": "CPV", "numeric": 132},
{"name": "Cambodia", "alpha2": "KH", "alpha3": "KHM", "numeric": 116},
{"name": "Cameroon", "alpha2": "CM", "alpha3": "CMR", "numeric": 120},
{"name": "Canada", "alpha2": "CA", "alpha3": "CAN", "numeric": 124},
{"name": "Cayman Islands (the)", "alpha2": "KY", "alpha3": "CYM", "numeric": 136},
{"name": "Central African Republic (the)", "alpha2": "CF", "alpha3": "CAF", "numeric": 140},
{"name": "Chad", "alpha2": "TD", "alpha3": "TCD", "numeric": 148},
{"name": "Chile", "alpha2": "CL", "alpha3": "CHL", "numeric": 152},
{"name": "China", "alpha2": "CN", "alpha3": "CHN", "numeric": 156},
{"name": "Christmas Island", "alpha2": "CX", "alpha3": "CXR", "numeric": 162},
{"name": "Cocos (Keeling) Islands (the)", "alpha2": "CC", "alpha3": "CCK", "numeric": 166},
{"name": "Colombia", "alpha2": "CO", "alpha3": "COL", "numeric": 170},
{"name": "Comoros (the)", "alpha2": "KM", "alpha3": "COM", "numeric": 174},
{"name": "Congo (the Democratic Republic of the)", "alpha2": "CD", "alpha3": "COD", "numeric": 180},
{"name": "Congo (the)", "alpha2": "CG", "alpha3": "COG", "numeric": 178},
{"name": "Cook Islands (the)", "alpha2": "CK", "alpha3": "COK", "numeric": 184},
{"name": "Costa Rica", "alpha2": "CR", "alpha3": "CRI", "numeric": 188},
{"name": "Côte d'Ivoire", "alpha2": "CI", "alpha3": "CIV", "numeric": 384},
{"name": "Croatia", "alpha2": "HR", "alpha3": "HRV", "numeric": 191},
{"name": "Cuba", "alpha2": "CU", "alpha3": "CUB", "numeric": 192},
{"name": "Curaçao", "alpha2": "CW", "alpha3": "CUW", "numeric": 531},
{"name": "Cyprus", "alpha2": "CY", "alpha3": "CYP", "numeric": 196},
{"name": "Czech Republic (the)", "alpha2": "CZ", "alpha3": "CZE", "numeric": 203},
{"name": "Denmark", "alpha2": "DK", "alpha3": "DNK", "numeric": 208},
{"name": "Djibouti", "alpha2": "DJ", "alpha3": "DJI", "numeric": 262},
{"name": "Dominica", "alpha2": "DM", "alpha3": "DMA", "numeric": 212},
{"name": "Dominican Republic (the)", "alpha2": "DO", "alpha3": "DOM", "numeric": 214},
{"name": "Ecuador", "alpha2": "EC", "alpha3": "ECU", "numeric": 218},
{"name": "Egypt", "alpha2": "EG", "alpha3": "EGY", "numeric": 818},
{"name": "El Salvador", "alpha2": "SV", "alpha3": "SLV", "numeric": 222},
{"name": "Equatorial Guinea", "alpha2": "GQ", "alpha3": "GNQ", "numeric": 226},
{"name": "Eritrea", "alpha2": "ER", "alpha3": "ERI", "numeric": 232},
{"name": "Estonia", "alpha2": "EE", "alpha3": "EST", "numeric": 233},
{"name": "Ethiopia", "alpha2": "ET", "alpha3": "ETH", "numeric": 231},
{"name": "Falkland Islands (the) [Malvinas]", "alpha2": "FK", "alpha3": "FLK", "numeric": 238},
{"name": "Faroe Islands (the)", "alpha2": "FO", "alpha3": "FRO", "numeric": 234},
{"name": "Fiji", "alpha2": "FJ", "alpha3": "FJI", "numeric": 242},
{"name": "Finland", "alpha2": "FI", "alpha3": "FIN", "numeric": 246},
{"name": "France", "alpha2": "FR", "alpha3": "FRA", "numeric": 250},
{"name": "French Guiana", "alpha2": "GF", "alpha3": "GUF", "numeric": 254},
{"name": "French Polynesia", "alpha2": "PF", "alpha3": "PYF", "numeric": 258},
{"name": "French Southern Territories (the)", "alpha2": "TF", "alpha3": "ATF", "numeric": 260},
{"name": "Gabon", "alpha2": "GA", "alpha3": "GAB", "numeric": 266},
{"name": "Gambia (the)", "alpha2": "GM", "alpha3": "GMB", "numeric": 270},
{"name": "Georgia", "alpha2": "GE", "alpha3": "GEO", "numeric": 268},
{"name": "Germany", "alpha2": "DE", "alpha3": "DEU", "numeric": 276},
{"name": "Ghana", "alpha2": "GH", "alpha3": "GHA", "numeric": 288},
{"name": "Gibraltar", "alpha2": "GI", "alpha3": "GIB", "numeric": 292},
{"name": "Greece", "alpha2": "GR", "alpha3": "GRC", "numeric": 300},
{"name": "Greenland", "alpha2": "GL", "alpha3": "GRL", "numeric": 304},
{"name": "Grenada", "alpha2": "GD", "alpha3": "GRD", "numeric": 308},
{"name": "Guadeloupe", "alpha2": "GP", "alpha3": "GLP", "numeric": 312},
{"name": "Guam", "alpha2": "GU", "alpha3": "GUM", "numeric": 316},
{"name": "Guatemala", "alpha2": "GT", "alpha3": "GTM", "numeric": 320},
{"name": "Guernsey", "alpha2": "GG", "alpha3": "GGY", "numeric": 831},
{"name": "Guinea", "alpha2": "GN", "alpha3": "GIN", "numeric": 324},
{"name": "Guinea-Bissau", "alpha2": "GW", "alpha3": "GNB", "numeric": 624},
{"name": "Guyana", "alpha2": "GY", "alpha3": "GUY", "numeric": 328},
{"name": "Haiti", "alpha2": "HT", "alpha3": "HTI", "numeric": 332},
{"name": "Heard Island and McDonald Islands", "alpha2": "HM", "alpha3": "HMD", "numeric": 334},
{"name": "Holy See (the)", "alpha2": "VA", "alpha3": "VAT", "numeric": 336},
{"name": "Honduras", "alpha2": "HN", "alpha3": "HND", "numeric": 340},
{"name": "Hong Kong", "alpha2": "HK", "alpha3": "HKG", "numeric": 344},
{"name": "Hungary", "alpha2": "HU", "alpha3": "HUN", "numeric": 348},
{"name": "Iceland", "alpha2": "IS", "alpha3": "ISL", "numeric": 352},
{"name": "India", "alpha2": "IN", "alpha3": "IND", "numeric": 356},
{"name": "Indonesia", "alpha2": "ID", "alpha3": "IDN", "numeric": 360},
{"name": "Iran (Islamic Republic of)", "alpha2": "IR", "alpha3": "IRN", "numeric": 364},
{"name": "Iraq", "alpha2": "IQ", "alpha3": "IRQ", "numeric": 368},
{"name": "Ireland", "alpha2": "IE", "alpha3": "IRL", "numeric": 372},
{"name": "Isle of Man", "alpha2": "IM", "alpha3": "IMN", "numeric": 833},
{"name": "Israel", "alpha2": "IL", "alpha3": "ISR", "numeric": 376},
{"name": "Italy", "alpha2": "IT", "alpha3": "ITA", "numeric": 380},
{"name": "Jamaica", "alpha2": "JM", "alpha3": "JAM", "numeric": 388},
{"name": "Japan", "alpha2": "JP", "alpha3": "JPN", "numeric": 392},
{"name": "Jersey", "alpha2": "JE", "alpha3": "JEY", "numeric": 832},
{"name": "Jordan", "alpha2": "JO", "alpha3": "JOR", "numeric": 400},
{"name": "Kazakhstan", "alpha2": "KZ", "alpha3": "KAZ", "numeric": 398},
{"name": "Kenya", "alpha2": "KE", "alpha3": "KEN", "numeric": 404},
{"name": "Kiribati", "alpha2": "KI", "alpha3": "KIR", "numeric": 296},
{"name": "Korea (the Democratic People's Republic of)", "alpha2": "KP", "alpha3": "PRK", "numeric": 408},
{"name": "Korea (the Republic of)", "alpha2": "KR", "alpha3": "KOR", "numeric": 410},
{"name": "Kuwait", "alpha2": "KW", "alpha3": "KWT", "numeric": 414},
{"name": "Kyrgyzstan", "alpha2": "KG", "alpha3": "KGZ", "numeric": 417},
{"name": "Lao People's Democratic Republic (the)", "alpha2": "LA", "alpha3": "LAO", "numeric": 418},
{"name": "Latvia", "alpha2": "LV", "alpha3": "LVA", "numeric": 428},
{"name": "Lebanon", "alpha2": "LB", "alpha3": "LBN", "numeric": 422},
{"name": "Lesotho", "alpha2": "LS", "alpha3": "LSO", "numeric": 426},
{"name": "Liberia", "alpha2": "LR", "alpha3": "LBR", "numeric": 430},
{"name": "Libya", "alpha2": "LY", "alpha3": "LBY", "numeric": 434},
{"name": "Liechtenstein", "alpha2": "LI", "alpha3": "LIE", "numeric": 438},
{"name": "Lithuania", "alpha2": "LT", "alpha3": "LTU", "numeric": 440},
{"name": "Luxembourg", "alpha2": "LU", "alpha3": "LUX", "numeric": 442},
{"name": "Macao", "alpha2": "MO", "alpha3": "MAC", "numeric": 446},
{"name": "Macedonia (the former Yugoslav Republic of)", "alpha2": "MK", "alpha3": "MKD", "numeric": 807},
{"name": "Madagascar", "alpha2": "MG", "alpha3": "MDG", "numeric": 450},
{"name": "Malawi", "alpha2": "MW", "alpha3": "MWI", "numeric": 454},
{"name": "Malaysia", "alpha2": "MY", "alpha3": "MYS", "numeric": 458},
{"name": "Maldives", "alpha2": "MV", "alpha3": "MDV", "numeric": 462},
{"name": "Mali", "alpha2": "ML", "alpha3": "MLI", "numeric": 466},
{"name": "Malta", "alpha2": "MT", "alpha3": "MLT", "numeric": 470},
{"name": "Marshall Islands (the)", "alpha2": "MH", "alpha3": "MHL", "numeric": 584},
{"name": "Martinique", "alpha2": "MQ", "alpha3": "MTQ", "numeric": 474},
{"name": "Mauritania", "alpha2": "MR", "alpha3": "MRT", "numeric": 478},
{"name": "Mauritius", "alpha2": "MU", "alpha3": "MUS", "numeric": 480},
{"name": "Mayotte", "alpha2": "YT", "alpha3": "MYT", "numeric": 175},
{"name": "Mexico", "alpha2": "MX", "alpha3": "MEX", "numeric": 484},
{"name": "Micronesia (Federated States of)", "alpha2": "FM", "alpha3": "FSM", "numeric": 583},
{"name": "Moldova (the Republic of)", "alpha2": "MD", "alpha3": "MDA", "numeric": 498},
{"name": "Monaco", "alpha2": "MC", "alpha3": "MCO", "numeric": 492},
{"name": "Mongolia", "alpha2": "MN", "alpha3": "MNG", "numeric": 496},
{"name": "Montenegro", "alpha2": "ME", "alpha3": "MNE", "numeric": 499},
{"name": "Montserrat", "alpha2": "MS", "alpha3": "MSR", "numeric": 500},
{"name": "Morocco", "alpha2": "MA", "alpha3": "MAR", "numeric": 504},
{"name": "Mozambique", "alpha2": "MZ", "alpha3": "MOZ", "numeric": 508},
{"name": "Myanmar", "alpha2": "MM", "alpha3": "MMR", "numeric": 104},
{"name": "Namibia", "alpha2": "NA", "alpha3": "NAM", "numeric": 516},
{"name": "Nauru", "alpha2": "NR", "alpha3": "NRU", "numeric": 520},
{"name": "Nepal", "alpha2": "NP", "alpha3": "NPL", "numeric": 524},
{"name": "Netherlands (the)", "alpha2": "NL", "alpha3": "NLD", "numeric": 528},
{"name": "New Caledonia", "alpha2": "NC", "alpha3": "NCL", "numeric": 540},
{"name": "New Zealand", "alpha2": "NZ", "alpha3": "NZL", "numeric": 554},
{"name": "Nicaragua", "alpha2": "NI", "alpha3": "NIC", "numeric": 558},
{"name": "Niger (the)", "alpha2": "NE", "alpha3": "NER", "numeric": 562},
{"name": "Nigeria", "alpha2": "NG", "alpha3": "NGA", "numeric": 566},
{"name": "Niue", "alpha2": "NU", "alpha3": "NIU", "numeric": 570},
{"name": "Norfolk Island", "alpha2": "NF", "alpha3": "NFK", "numeric": 574},
{"name": "Northern Mariana Islands (the)", "alpha2": "MP", "alpha3": "MNP", "numeric": 580},
{"name": "Norway", "alpha2": "NO", "alpha3": "NOR", "numeric": 578},
{"name": "Oman", "alpha2": "OM", "alpha3": "OMN", "numeric": 512},
{"name": "Pakistan", "alpha2": "PK", "alpha3": "PAK", "numeric": 586},
{"name": "Palau", "alpha2": "PW", "alpha3": "PLW", "numeric": 585},
{"name": "Palestine, State of", "alpha2": "PS", "alpha3": "PSE", "numeric": 275},
{"name": "Panama", "alpha2": "PA", "alpha3": "PAN", "numeric": 591},
{"name": "Papua New Guinea", "alpha2": "PG", "alpha3": "PNG", "numeric": 598},
{"name": "Paraguay", "alpha2": "PY", "alpha3": "PRY", "numeric": 600},
{"name": "Peru", "alpha2": "PE", "alpha3": "PER", "numeric": 604},
{"name": "Philippines (the)", "alpha2": "PH", "alpha3": "PHL", "numeric": 608},
{"name": "Pitcairn", "alpha2": "PN", "alpha3": "PCN", "numeric": 612},
{"name": "Poland", "alpha2": "PL", "alpha3": "POL", "numeric": 616},
{"name": "Portugal", "alpha2": "PT", "alpha3": "PRT", "numeric": 620},
{"name": "Puerto Rico", "alpha2": "PR", "alpha3": "PRI", "numeric": 630},
{"name": "Qatar", "alpha2": "QA", "alpha3": "QAT", "numeric": 634},
{"name": "Réunion", "alpha2": "RE", "alpha3": "REU", "numeric": 638},
{"name": "Romania", "alpha2": "RO", "alpha3": "ROU", "numeric": 642},
{"name": "Russian Federation (the)", "alpha2": "RU", "alpha3": "RUS", "numeric": 643},
{"name": "Rwanda", "alpha2": "RW", "alpha3": "RWA", "numeric": 646},
{"name": "Saint Barthélemy", "alpha2": "BL", "alpha3": "BLM", "numeric": 652},
{"name": "Saint Helena, Ascension and Tristan da Cunha", "alpha2": "SH", "alpha3": "SHN", "numeric": 654},
{"name": "Saint Kitts and Nevis", "alpha2": "KN", "alpha3": "KNA", "numeric": 659},
{"name": "Saint Lucia", "alpha2": "LC", "alpha3": "LCA", "numeric": 662},
{"name": "Saint Martin (French part)", "alpha2": "MF", "alpha3": "MAF", "numeric": 663},
{"name": "Saint Pierre and Miquelon", "alpha2": "PM", "alpha3": "SPM", "numeric": 666},
{"name": "Saint Vincent and the Grenadines", "alpha2": "VC", "alpha3": "VCT", "numeric": 670},
{"name": "Samoa", "alpha2": "WS", "alpha3": "WSM", "numeric": 882},
{"name": "San Marino", "alpha2": "SM", "alpha3": "SMR", "numeric": 674},
{"name": "Sao Tome and Principe", "alpha2": "ST", "alpha3": "STP", "numeric": 678},
{"name": "Saudi Arabia", "alpha2": "SA", "alpha3": "SAU", "numeric": 682},
{"name": "Senegal", "alpha2": "SN", "alpha3": "SEN", "numeric": 686},
{"name": "Serbia", "alpha2": "RS", "alpha3": "SRB", "numeric": 688},
{"name": "Seychelles", "alpha2": "SC", "alpha3": "SYC", "numeric": 690},
{"name": "Sierra Leone", "alpha2": "SL", "alpha3": "SLE", "numeric": 694},
{"name": "Singapore", "alpha2": "SG", "alpha3": "SGP", "numeric": 702},
{"name": "Sint Maarten (Dutch part)", "alpha2": "SX", "alpha3": "SXM", "numeric": 534},
{"name": "Slovakia", "alpha2": "SK", "alpha3": "SVK", "numeric": 703},
{"name": "Slovenia", "alpha2": "SI", "alpha3": "SVN", "numeric": 705},
{"name": "Solomon Islands", "alpha2": "SB", "alpha3": "SLB", "numeric": 90},
{"name": "Somalia", "alpha2": "SO", "alpha3": "SOM", "numeric": 706},
{"name": "South Africa", "alpha2": "ZA", "alpha3": "ZAF", "numeric": 710},
{"name": "South Georgia and the South Sandwich Islands", "alpha2": "GS", "alpha3": "SGS", "numeric": 239},
{"name": "South Sudan", "alpha2": "SS", "alpha3": "SSD", "numeric": 728},
{"name": "Spain", "alpha2": "ES", "alpha3": "ESP", "numeric": 724},
{"name": "Sri Lanka", "alpha2": "LK", "alpha3": "LKA", "numeric": 144},
{"name": "Sudan (the)", "alpha2": "SD", "alpha3": "SDN", "numeric": 729},
{"name": "Suriname", "alpha2": "SR", "alpha3": "SUR", "numeric": 740},
{"name": "Svalbard and Jan Mayen", "alpha2": "SJ", "alpha3": "SJM", "numeric": 744},
{"name": "Swaziland", "alpha2": "SZ", "alpha3": "SWZ", "numeric": 748},
{"name": "Sweden", "alpha2": "SE", "alpha3": "SWE", "numeric": 752},
{"name": "Switzerland", "alpha2": "CH", "alpha3": "CHE", "numeric": 756},
{"name": "Syrian Arab Republic", "alpha2": "SY", "alpha3": "SYR", "numeric": 760},
{"name": "Taiwan (Province of China)", "alpha2": "TW", "alpha3": "TWN", "numeric": 158},
{"name": "Tajikistan", "alpha2": "TJ", "alpha3": "TJK", "numeric": 762},
{"name": "Tanzania, United Republic of", "alpha2": "TZ", "alpha3": "TZA", "numeric": 834},
{"name": "Thailand", "alpha2": "TH", "alpha3": "THA", "numeric": 764},
{"name": "Timor-Leste", "alpha2": "TL", "alpha3": "TLS", "numeric": 626},
{"name": "Togo", "alpha2": "TG", "alpha3": "TGO", "numeric": 768},
{"name": "Tokelau", "alpha2": "TK", "alpha3": "TKL", "numeric": 772},
{"name": "Tonga", "alpha2": "TO", "alpha3": "TON", "numeric": 776},
{"name": "Trinidad and Tobago", "alpha2": "TT", "alpha3": "TTO", "numeric": 780},
{"name": "Tunisia", "alpha2": "TN", "alpha3": "TUN", "numeric": 788},
{"name": "Turkey", "alpha2": "TR", "alpha3": "TUR", "numeric": 792},
{"name": "Turkmenistan", "alpha2": "TM", "alpha3": "TKM", "numeric": 795},
{"name": "Turks and Caicos Islands (the)", "alpha2": "TC", "alpha3": "TCA", "numeric": 796},
{"name": "Tuvalu", "alpha2": "TV", "alpha3": "TUV", "numeric": 798},
{"name": "Uganda", "alpha2": "UG", "alpha3": "UGA", "numeric": 800},
{"name": "Ukraine", "alpha2": "UA", "alpha3": "UKR", "numeric": 804},
{"name": "United Arab Emirates (the)", "alpha2": "AE", "alpha3": "ARE", "numeric": 784},
{"name": "United Kingdom of Great Britain and Northern Ireland (the)", "alpha2": "GB", "alpha3": "GBR", "numeric": 826},
{"name": "United States Minor Outlying Islands (the)", "alpha2": "UM", "alpha3": "UMI", "numeric": 581},
{"name": "United States of America (the)", "alpha2": "US", "alpha3": "USA", "numeric": 840},
{"name": "Uruguay", "alpha2": "UY", "alpha3": "URY", "numeric": 858},
{"name": "Uzbekistan", "alpha2": "UZ", "alpha3": "UZB", "numeric": 860},
{"name": "Vanuatu", "alpha2": "VU", "alpha3": "VUT", "numeric": 548},
{"name": "Venezuela (Bolivarian Republic of)", "alpha2": "VE", "alpha3": "VEN", "numeric": 862},
{"name": "Viet Nam", "alpha2": "VN", "alpha3": "VNM", "numeric": 704},
{"name": "Virgin Islands (British)", "alpha2": "VG", "alpha3": "VGB", "numeric": 92},
{"name": "Virgin Islands (U.S.)", "alpha2": "VI", "alpha3": "VIR", "numeric": 850},
{"name": "Wallis and Futuna", "alpha2": "WF", "alpha3": "WLF", "numeric": 876},
{"name": "Western Sahara*", "alpha2": "EH", "alpha3": "ESH", "numeric": 732},
{"name": "Yemen", "alpha2": "YE", "alpha3": "YEM", "numeric": 887},
{"name": "Zambia", "alpha2": "ZM", "alpha3": "ZMB", "numeric": 894},
{"name": "Zimbabwe", "alpha2": "ZW", "alpha3": "ZWE", "numeric": 716}
];


module.exports = React.createClass({
  mixins: [WidgetMixin],

  statics: {
    getCountryNameByAlpha2(code) {
      for (let i = 0; i < countries.length; i++) {
        if (countries[i].alpha2 === code) {
          return countries[i].name;
        }
      }
      return '';
    },
    getCountryFlagByAlpha2(code) {
      var image = null;
      switch (code.toLowerCase()) {
        case 'ad':
          image = require('../icons/flags/flags_iso/48/ad.png');
          break;
        case 'au':
          image = require('../icons/flags/flags_iso/48/au.png');
          break;
        case 'bl':
          image = require('../icons/flags/flags_iso/48/bl.png');
          break;
        case 'cc':
          image = require('../icons/flags/flags_iso/48/cc.png');
          break;
        case 'cv':
          image = require('../icons/flags/flags_iso/48/cv.png');
          break;
        case 'eg':
          image = require('../icons/flags/flags_iso/48/eg.png');
          break;
        case 'gd':
          image = require('../icons/flags/flags_iso/48/gd.png');
          break;
        case 'gt':
          image = require('../icons/flags/flags_iso/48/gt.png');
          break;
        case 'im':
          image = require('../icons/flags/flags_iso/48/im.png');
          break;
        case 'kh':
          image = require('../icons/flags/flags_iso/48/kh.png');
          break;
        case 'lk':
          image = require('../icons/flags/flags_iso/48/lk.png');
          break;
        case 'mh':
          image = require('../icons/flags/flags_iso/48/mh.png');
          break;
        case 'mw':
          image = require('../icons/flags/flags_iso/48/mw.png');
          break;
        case 'nr':
          image = require('../icons/flags/flags_iso/48/nr.png');
          break;
        case 'pr':
          image = require('../icons/flags/flags_iso/48/pr.png');
          break;
        case 'sc':
          image = require('../icons/flags/flags_iso/48/sc.png');
          break;
        case 'ss':
          image = require('../icons/flags/flags_iso/48/ss.png');
          break;
        case 'tl':
          image = require('../icons/flags/flags_iso/48/tl.png');
          break;
        case 'uy':
          image = require('../icons/flags/flags_iso/48/uy.png');
          break;
        case 'za':
          image = require('../icons/flags/flags_iso/48/za.png');
          break;
        case 'ae':
          image = require('../icons/flags/flags_iso/48/ae.png');
          break;
        case 'aw':
          image = require('../icons/flags/flags_iso/48/aw.png');
          break;
        case 'bm':
          image = require('../icons/flags/flags_iso/48/bm.png');
          break;
        case 'cd':
          image = require('../icons/flags/flags_iso/48/cd.png');
          break;
        case 'cw':
          image = require('../icons/flags/flags_iso/48/cw.png');
          break;
        case 'eh':
          image = require('../icons/flags/flags_iso/48/eh.png');
          break;
        case 'ge':
          image = require('../icons/flags/flags_iso/48/ge.png');
          break;
        case 'gu':
          image = require('../icons/flags/flags_iso/48/gu.png');
          break;
        case 'in':
          image = require('../icons/flags/flags_iso/48/in.png');
          break;
        case 'ki':
          image = require('../icons/flags/flags_iso/48/ki.png');
          break;
        case 'lr':
          image = require('../icons/flags/flags_iso/48/lr.png');
          break;
        case 'mk':
          image = require('../icons/flags/flags_iso/48/mk.png');
          break;
        case 'mx':
          image = require('../icons/flags/flags_iso/48/mx.png');
          break;
        case 'nu':
          image = require('../icons/flags/flags_iso/48/nu.png');
          break;
        case 'ps':
          image = require('../icons/flags/flags_iso/48/ps.png');
          break;
        case 'sd':
          image = require('../icons/flags/flags_iso/48/sd.png');
          break;
        case 'st':
          image = require('../icons/flags/flags_iso/48/st.png');
          break;
        case 'tm':
          image = require('../icons/flags/flags_iso/48/tm.png');
          break;
        case 'uz':
          image = require('../icons/flags/flags_iso/48/uz.png');
          break;
        case 'zm':
          image = require('../icons/flags/flags_iso/48/zm.png');
          break;
        case 'af':
          image = require('../icons/flags/flags_iso/48/af.png');
          break;
        case 'ax':
          image = require('../icons/flags/flags_iso/48/ax.png');
          break;
        case 'bn':
          image = require('../icons/flags/flags_iso/48/bn.png');
          break;
        case 'cf':
          image = require('../icons/flags/flags_iso/48/cf.png');
          break;
        case 'cx':
          image = require('../icons/flags/flags_iso/48/cx.png');
          break;
        case 'er':
          image = require('../icons/flags/flags_iso/48/er.png');
          break;
        case 'gf':
          image = require('../icons/flags/flags_iso/48/gf.png');
          break;
        case 'gw':
          image = require('../icons/flags/flags_iso/48/gw.png');
          break;
        case 'io':
          image = require('../icons/flags/flags_iso/48/io.png');
          break;
        case 'km':
          image = require('../icons/flags/flags_iso/48/km.png');
          break;
        case 'ls':
          image = require('../icons/flags/flags_iso/48/ls.png');
          break;
        case 'ml':
          image = require('../icons/flags/flags_iso/48/ml.png');
          break;
        case 'my':
          image = require('../icons/flags/flags_iso/48/my.png');
          break;
        case 'nz':
          image = require('../icons/flags/flags_iso/48/nz.png');
          break;
        case 'pt':
          image = require('../icons/flags/flags_iso/48/pt.png');
          break;
        case 'se':
          image = require('../icons/flags/flags_iso/48/se.png');
          break;
        case 'sv':
          image = require('../icons/flags/flags_iso/48/sv.png');
          break;
        case 'tn':
          image = require('../icons/flags/flags_iso/48/tn.png');
          break;
        case 'va':
          image = require('../icons/flags/flags_iso/48/va.png');
          break;
        case 'zw':
          image = require('../icons/flags/flags_iso/48/zw.png');
          break;
        case 'ag':
          image = require('../icons/flags/flags_iso/48/ag.png');
          break;
        case 'az':
          image = require('../icons/flags/flags_iso/48/az.png');
          break;
        case 'bo':
          image = require('../icons/flags/flags_iso/48/bo.png');
          break;
        case 'cg':
          image = require('../icons/flags/flags_iso/48/cg.png');
          break;
        case 'cy':
          image = require('../icons/flags/flags_iso/48/cy.png');
          break;
        case 'es':
          image = require('../icons/flags/flags_iso/48/es.png');
          break;
        case 'gg':
          image = require('../icons/flags/flags_iso/48/gg.png');
          break;
        case 'gy':
          image = require('../icons/flags/flags_iso/48/gy.png');
          break;
        case 'iq':
          image = require('../icons/flags/flags_iso/48/iq.png');
          break;
        case 'kn':
          image = require('../icons/flags/flags_iso/48/kn.png');
          break;
        case 'lt':
          image = require('../icons/flags/flags_iso/48/lt.png');
          break;
        case 'mm':
          image = require('../icons/flags/flags_iso/48/mm.png');
          break;
        case 'mz':
          image = require('../icons/flags/flags_iso/48/mz.png');
          break;
        case 'om':
          image = require('../icons/flags/flags_iso/48/om.png');
          break;
        case 'pw':
          image = require('../icons/flags/flags_iso/48/pw.png');
          break;
        case 'sg':
          image = require('../icons/flags/flags_iso/48/sg.png');
          break;
        case 'sx':
          image = require('../icons/flags/flags_iso/48/sx.png');
          break;
        case 'to':
          image = require('../icons/flags/flags_iso/48/to.png');
          break;
        case 'vc':
          image = require('../icons/flags/flags_iso/48/vc.png');
          break;
        case 'ai':
          image = require('../icons/flags/flags_iso/48/ai.png');
          break;
        case 'ba':
          image = require('../icons/flags/flags_iso/48/ba.png');
          break;
        case 'bq':
          image = require('../icons/flags/flags_iso/48/bq.png');
          break;
        case 'ch':
          image = require('../icons/flags/flags_iso/48/ch.png');
          break;
        case 'cz':
          image = require('../icons/flags/flags_iso/48/cz.png');
          break;
        case 'et':
          image = require('../icons/flags/flags_iso/48/et.png');
          break;
        case 'gh':
          image = require('../icons/flags/flags_iso/48/gh.png');
          break;
        case 'hk':
          image = require('../icons/flags/flags_iso/48/hk.png');
          break;
        case 'ir':
          image = require('../icons/flags/flags_iso/48/ir.png');
          break;
        case 'kp':
          image = require('../icons/flags/flags_iso/48/kp.png');
          break;
        case 'lu':
          image = require('../icons/flags/flags_iso/48/lu.png');
          break;
        case 'mn':
          image = require('../icons/flags/flags_iso/48/mn.png');
          break;
        case 'na':
          image = require('../icons/flags/flags_iso/48/na.png');
          break;
        case 'pa':
          image = require('../icons/flags/flags_iso/48/pa.png');
          break;
        case 'py':
          image = require('../icons/flags/flags_iso/48/py.png');
          break;
        case 'sh':
          image = require('../icons/flags/flags_iso/48/sh.png');
          break;
        case 'sy':
          image = require('../icons/flags/flags_iso/48/sy.png');
          break;
        case 'tr':
          image = require('../icons/flags/flags_iso/48/tr.png');
          break;
        case 've':
          image = require('../icons/flags/flags_iso/48/ve.png');
          break;
        case 'al':
          image = require('../icons/flags/flags_iso/48/al.png');
          break;
        case 'bb':
          image = require('../icons/flags/flags_iso/48/bb.png');
          break;
        case 'br':
          image = require('../icons/flags/flags_iso/48/br.png');
          break;
        case 'ci':
          image = require('../icons/flags/flags_iso/48/ci.png');
          break;
        case 'de':
          image = require('../icons/flags/flags_iso/48/de.png');
          break;
        case 'fi':
          image = require('../icons/flags/flags_iso/48/fi.png');
          break;
        case 'gi':
          image = require('../icons/flags/flags_iso/48/gi.png');
          break;
        case 'hm':
          image = require('../icons/flags/flags_iso/48/hm.png');
          break;
        case 'is':
          image = require('../icons/flags/flags_iso/48/is.png');
          break;
        case 'kr':
          image = require('../icons/flags/flags_iso/48/kr.png');
          break;
        case 'lv':
          image = require('../icons/flags/flags_iso/48/lv.png');
          break;
        case 'mo':
          image = require('../icons/flags/flags_iso/48/mo.png');
          break;
        case 'nc':
          image = require('../icons/flags/flags_iso/48/nc.png');
          break;
        case 'pe':
          image = require('../icons/flags/flags_iso/48/pe.png');
          break;
        case 'qa':
          image = require('../icons/flags/flags_iso/48/qa.png');
          break;
        case 'si':
          image = require('../icons/flags/flags_iso/48/si.png');
          break;
        case 'sz':
          image = require('../icons/flags/flags_iso/48/sz.png');
          break;
        case 'tt':
          image = require('../icons/flags/flags_iso/48/tt.png');
          break;
        case 'vg':
          image = require('../icons/flags/flags_iso/48/vg.png');
          break;
        case 'am':
          image = require('../icons/flags/flags_iso/48/am.png');
          break;
        case 'bd':
          image = require('../icons/flags/flags_iso/48/bd.png');
          break;
        case 'bs':
          image = require('../icons/flags/flags_iso/48/bs.png');
          break;
        case 'ck':
          image = require('../icons/flags/flags_iso/48/ck.png');
          break;
        case 'dj':
          image = require('../icons/flags/flags_iso/48/dj.png');
          break;
        case 'fj':
          image = require('../icons/flags/flags_iso/48/fj.png');
          break;
        case 'gl':
          image = require('../icons/flags/flags_iso/48/gl.png');
          break;
        case 'hn':
          image = require('../icons/flags/flags_iso/48/hn.png');
          break;
        case 'it':
          image = require('../icons/flags/flags_iso/48/it.png');
          break;
        case 'kw':
          image = require('../icons/flags/flags_iso/48/kw.png');
          break;
        case 'ly':
          image = require('../icons/flags/flags_iso/48/ly.png');
          break;
        case 'mp':
          image = require('../icons/flags/flags_iso/48/mp.png');
          break;
        case 'ne':
          image = require('../icons/flags/flags_iso/48/ne.png');
          break;
        case 'pf':
          image = require('../icons/flags/flags_iso/48/pf.png');
          break;
        case 're':
          image = require('../icons/flags/flags_iso/48/re.png');
          break;
        case 'sj':
          image = require('../icons/flags/flags_iso/48/sj.png');
          break;
        case 'tc':
          image = require('../icons/flags/flags_iso/48/tc.png');
          break;
        case 'tv':
          image = require('../icons/flags/flags_iso/48/tv.png');
          break;
        case 'vi':
          image = require('../icons/flags/flags_iso/48/vi.png');
          break;
        case 'an':
          image = require('../icons/flags/flags_iso/48/an.png');
          break;
        case 'be':
          image = require('../icons/flags/flags_iso/48/be.png');
          break;
        case 'bt':
          image = require('../icons/flags/flags_iso/48/bt.png');
          break;
        case 'cl':
          image = require('../icons/flags/flags_iso/48/cl.png');
          break;
        case 'dk':
          image = require('../icons/flags/flags_iso/48/dk.png');
          break;
        case 'fk':
          image = require('../icons/flags/flags_iso/48/fk.png');
          break;
        case 'gm':
          image = require('../icons/flags/flags_iso/48/gm.png');
          break;
        case 'hr':
          image = require('../icons/flags/flags_iso/48/hr.png');
          break;
        case 'je':
          image = require('../icons/flags/flags_iso/48/je.png');
          break;
        case 'ky':
          image = require('../icons/flags/flags_iso/48/ky.png');
          break;
        case 'ma':
          image = require('../icons/flags/flags_iso/48/ma.png');
          break;
        case 'mq':
          image = require('../icons/flags/flags_iso/48/mq.png');
          break;
        case 'nf':
          image = require('../icons/flags/flags_iso/48/nf.png');
          break;
        case 'pg':
          image = require('../icons/flags/flags_iso/48/pg.png');
          break;
        case 'ro':
          image = require('../icons/flags/flags_iso/48/ro.png');
          break;
        case 'sk':
          image = require('../icons/flags/flags_iso/48/sk.png');
          break;
        case 'td':
          image = require('../icons/flags/flags_iso/48/td.png');
          break;
        case 'tw':
          image = require('../icons/flags/flags_iso/48/tw.png');
          break;
        case 'vn':
          image = require('../icons/flags/flags_iso/48/vn.png');
          break;
        case 'ao':
          image = require('../icons/flags/flags_iso/48/ao.png');
          break;
        case 'bf':
          image = require('../icons/flags/flags_iso/48/bf.png');
          break;
        case 'bv':
          image = require('../icons/flags/flags_iso/48/bv.png');
          break;
        case 'cm':
          image = require('../icons/flags/flags_iso/48/cm.png');
          break;
        case 'dm':
          image = require('../icons/flags/flags_iso/48/dm.png');
          break;
        case 'fm':
          image = require('../icons/flags/flags_iso/48/fm.png');
          break;
        case 'gn':
          image = require('../icons/flags/flags_iso/48/gn.png');
          break;
        case 'ht':
          image = require('../icons/flags/flags_iso/48/ht.png');
          break;
        case 'jm':
          image = require('../icons/flags/flags_iso/48/jm.png');
          break;
        case 'kz':
          image = require('../icons/flags/flags_iso/48/kz.png');
          break;
        case 'mc':
          image = require('../icons/flags/flags_iso/48/mc.png');
          break;
        case 'mr':
          image = require('../icons/flags/flags_iso/48/mr.png');
          break;
        case 'ng':
          image = require('../icons/flags/flags_iso/48/ng.png');
          break;
        case 'ph':
          image = require('../icons/flags/flags_iso/48/ph.png');
          break;
        case 'rs':
          image = require('../icons/flags/flags_iso/48/rs.png');
          break;
        case 'sl':
          image = require('../icons/flags/flags_iso/48/sl.png');
          break;
        case 'tf':
          image = require('../icons/flags/flags_iso/48/tf.png');
          break;
        case 'tz':
          image = require('../icons/flags/flags_iso/48/tz.png');
          break;
        case 'vu':
          image = require('../icons/flags/flags_iso/48/vu.png');
          break;
        case 'aq':
          image = require('../icons/flags/flags_iso/48/aq.png');
          break;
        case 'bg':
          image = require('../icons/flags/flags_iso/48/bg.png');
          break;
        case 'bw':
          image = require('../icons/flags/flags_iso/48/bw.png');
          break;
        case 'cn':
          image = require('../icons/flags/flags_iso/48/cn.png');
          break;
        case 'do':
          image = require('../icons/flags/flags_iso/48/do.png');
          break;
        case 'fo':
          image = require('../icons/flags/flags_iso/48/fo.png');
          break;
        case 'gp':
          image = require('../icons/flags/flags_iso/48/gp.png');
          break;
        case 'hu':
          image = require('../icons/flags/flags_iso/48/hu.png');
          break;
        case 'jo':
          image = require('../icons/flags/flags_iso/48/jo.png');
          break;
        case 'la':
          image = require('../icons/flags/flags_iso/48/la.png');
          break;
        case 'md':
          image = require('../icons/flags/flags_iso/48/md.png');
          break;
        case 'ms':
          image = require('../icons/flags/flags_iso/48/ms.png');
          break;
        case 'ni':
          image = require('../icons/flags/flags_iso/48/ni.png');
          break;
        case 'pk':
          image = require('../icons/flags/flags_iso/48/pk.png');
          break;
        case 'ru':
          image = require('../icons/flags/flags_iso/48/ru.png');
          break;
        case 'sm':
          image = require('../icons/flags/flags_iso/48/sm.png');
          break;
        case 'tg':
          image = require('../icons/flags/flags_iso/48/tg.png');
          break;
        case 'ua':
          image = require('../icons/flags/flags_iso/48/ua.png');
          break;
        case 'wf':
          image = require('../icons/flags/flags_iso/48/wf.png');
          break;
        case 'ar':
          image = require('../icons/flags/flags_iso/48/ar.png');
          break;
        case 'bh':
          image = require('../icons/flags/flags_iso/48/bh.png');
          break;
        case 'by':
          image = require('../icons/flags/flags_iso/48/by.png');
          break;
        case 'co':
          image = require('../icons/flags/flags_iso/48/co.png');
          break;
        case 'dz':
          image = require('../icons/flags/flags_iso/48/dz.png');
          break;
        case 'fr':
          image = require('../icons/flags/flags_iso/48/fr.png');
          break;
        case 'gq':
          image = require('../icons/flags/flags_iso/48/gq.png');
          break;
        case 'id':
          image = require('../icons/flags/flags_iso/48/id.png');
          break;
        case 'jp':
          image = require('../icons/flags/flags_iso/48/jp.png');
          break;
        case 'lb':
          image = require('../icons/flags/flags_iso/48/lb.png');
          break;
        case 'me':
          image = require('../icons/flags/flags_iso/48/me.png');
          break;
        case 'mt':
          image = require('../icons/flags/flags_iso/48/mt.png');
          break;
        case 'nl':
          image = require('../icons/flags/flags_iso/48/nl.png');
          break;
        case 'pl':
          image = require('../icons/flags/flags_iso/48/pl.png');
          break;
        case 'rw':
          image = require('../icons/flags/flags_iso/48/rw.png');
          break;
        case 'sn':
          image = require('../icons/flags/flags_iso/48/sn.png');
          break;
        case 'th':
          image = require('../icons/flags/flags_iso/48/th.png');
          break;
        case 'ug':
          image = require('../icons/flags/flags_iso/48/ug.png');
          break;
        case 'ws':
          image = require('../icons/flags/flags_iso/48/ws.png');
          break;
        case 'as':
          image = require('../icons/flags/flags_iso/48/as.png');
          break;
        case 'bi':
          image = require('../icons/flags/flags_iso/48/bi.png');
          break;
        case 'bz':
          image = require('../icons/flags/flags_iso/48/bz.png');
          break;
        case 'cr':
          image = require('../icons/flags/flags_iso/48/cr.png');
          break;
        case 'ec':
          image = require('../icons/flags/flags_iso/48/ec.png');
          break;
        case 'ga':
          image = require('../icons/flags/flags_iso/48/ga.png');
          break;
        case 'gr':
          image = require('../icons/flags/flags_iso/48/gr.png');
          break;
        case 'ie':
          image = require('../icons/flags/flags_iso/48/ie.png');
          break;
        case 'ke':
          image = require('../icons/flags/flags_iso/48/ke.png');
          break;
        case 'lc':
          image = require('../icons/flags/flags_iso/48/lc.png');
          break;
        case 'mf':
          image = require('../icons/flags/flags_iso/48/mf.png');
          break;
        case 'mu':
          image = require('../icons/flags/flags_iso/48/mu.png');
          break;
        case 'no':
          image = require('../icons/flags/flags_iso/48/no.png');
          break;
        case 'pm':
          image = require('../icons/flags/flags_iso/48/pm.png');
          break;
        case 'sa':
          image = require('../icons/flags/flags_iso/48/sa.png');
          break;
        case 'so':
          image = require('../icons/flags/flags_iso/48/so.png');
          break;
        case 'tj':
          image = require('../icons/flags/flags_iso/48/tj.png');
          break;
        case 'um':
          image = require('../icons/flags/flags_iso/48/um.png');
          break;
        case 'ye':
          image = require('../icons/flags/flags_iso/48/ye.png');
          break;
        case 'at':
          image = require('../icons/flags/flags_iso/48/at.png');
          break;
        case 'bj':
          image = require('../icons/flags/flags_iso/48/bj.png');
          break;
        case 'ca':
          image = require('../icons/flags/flags_iso/48/ca.png');
          break;
        case 'cu':
          image = require('../icons/flags/flags_iso/48/cu.png');
          break;
        case 'ee':
          image = require('../icons/flags/flags_iso/48/ee.png');
          break;
        case 'gb':
          image = require('../icons/flags/flags_iso/48/gb.png');
          break;
        case 'gs':
          image = require('../icons/flags/flags_iso/48/gs.png');
          break;
        case 'il':
          image = require('../icons/flags/flags_iso/48/il.png');
          break;
        case 'kg':
          image = require('../icons/flags/flags_iso/48/kg.png');
          break;
        case 'li':
          image = require('../icons/flags/flags_iso/48/li.png');
          break;
        case 'mg':
          image = require('../icons/flags/flags_iso/48/mg.png');
          break;
        case 'mv':
          image = require('../icons/flags/flags_iso/48/mv.png');
          break;
        case 'np':
          image = require('../icons/flags/flags_iso/48/np.png');
          break;
        case 'pn':
          image = require('../icons/flags/flags_iso/48/pn.png');
          break;
        case 'sb':
          image = require('../icons/flags/flags_iso/48/sb.png');
          break;
        case 'sr':
          image = require('../icons/flags/flags_iso/48/sr.png');
          break;
        case 'tk':
          image = require('../icons/flags/flags_iso/48/tk.png');
          break;
        case 'us':
          image = require('../icons/flags/flags_iso/48/us.png');
          break;
        case 'yt':
          image = require('../icons/flags/flags_iso/48/yt.png');
          break;
        default:
          image = null;
      }

      return image;
    },
  },

  getDefaultProps() {
    return {
      type: 'SelectCountryWidget',
      onClose: () => {},
      code: 'alpha2',
      autoFocus: false,
    };
  },

  onSelect(name, value) {
    this._onChange(value);
    this.props.onClose(name, this.props.navigator);
  },


  // @todo image as option

  renderRow(rowData, sectionID, rowID) {
    // react-native image asset requires static filenames
    // icons from http://www.icondrawer.com/

    var image = null;
    switch (rowData.alpha2.toLowerCase()) {
      case 'ad':
        image = require('../icons/flags/flags_iso/48/ad.png');
        break;
      case 'au':
        image = require('../icons/flags/flags_iso/48/au.png');
        break;
      case 'bl':
        image = require('../icons/flags/flags_iso/48/bl.png');
        break;
      case 'cc':
        image = require('../icons/flags/flags_iso/48/cc.png');
        break;
      case 'cv':
        image = require('../icons/flags/flags_iso/48/cv.png');
        break;
      case 'eg':
        image = require('../icons/flags/flags_iso/48/eg.png');
        break;
      case 'gd':
        image = require('../icons/flags/flags_iso/48/gd.png');
        break;
      case 'gt':
        image = require('../icons/flags/flags_iso/48/gt.png');
        break;
      case 'im':
        image = require('../icons/flags/flags_iso/48/im.png');
        break;
      case 'kh':
        image = require('../icons/flags/flags_iso/48/kh.png');
        break;
      case 'lk':
        image = require('../icons/flags/flags_iso/48/lk.png');
        break;
      case 'mh':
        image = require('../icons/flags/flags_iso/48/mh.png');
        break;
      case 'mw':
        image = require('../icons/flags/flags_iso/48/mw.png');
        break;
      case 'nr':
        image = require('../icons/flags/flags_iso/48/nr.png');
        break;
      case 'pr':
        image = require('../icons/flags/flags_iso/48/pr.png');
        break;
      case 'sc':
        image = require('../icons/flags/flags_iso/48/sc.png');
        break;
      case 'ss':
        image = require('../icons/flags/flags_iso/48/ss.png');
        break;
      case 'tl':
        image = require('../icons/flags/flags_iso/48/tl.png');
        break;
      case 'uy':
        image = require('../icons/flags/flags_iso/48/uy.png');
        break;
      case 'za':
        image = require('../icons/flags/flags_iso/48/za.png');
        break;
      case 'ae':
        image = require('../icons/flags/flags_iso/48/ae.png');
        break;
      case 'aw':
        image = require('../icons/flags/flags_iso/48/aw.png');
        break;
      case 'bm':
        image = require('../icons/flags/flags_iso/48/bm.png');
        break;
      case 'cd':
        image = require('../icons/flags/flags_iso/48/cd.png');
        break;
      case 'cw':
        image = require('../icons/flags/flags_iso/48/cw.png');
        break;
      case 'eh':
        image = require('../icons/flags/flags_iso/48/eh.png');
        break;
      case 'ge':
        image = require('../icons/flags/flags_iso/48/ge.png');
        break;
      case 'gu':
        image = require('../icons/flags/flags_iso/48/gu.png');
        break;
      case 'in':
        image = require('../icons/flags/flags_iso/48/in.png');
        break;
      case 'ki':
        image = require('../icons/flags/flags_iso/48/ki.png');
        break;
      case 'lr':
        image = require('../icons/flags/flags_iso/48/lr.png');
        break;
      case 'mk':
        image = require('../icons/flags/flags_iso/48/mk.png');
        break;
      case 'mx':
        image = require('../icons/flags/flags_iso/48/mx.png');
        break;
      case 'nu':
        image = require('../icons/flags/flags_iso/48/nu.png');
        break;
      case 'ps':
        image = require('../icons/flags/flags_iso/48/ps.png');
        break;
      case 'sd':
        image = require('../icons/flags/flags_iso/48/sd.png');
        break;
      case 'st':
        image = require('../icons/flags/flags_iso/48/st.png');
        break;
      case 'tm':
        image = require('../icons/flags/flags_iso/48/tm.png');
        break;
      case 'uz':
        image = require('../icons/flags/flags_iso/48/uz.png');
        break;
      case 'zm':
        image = require('../icons/flags/flags_iso/48/zm.png');
        break;
      case 'af':
        image = require('../icons/flags/flags_iso/48/af.png');
        break;
      case 'ax':
        image = require('../icons/flags/flags_iso/48/ax.png');
        break;
      case 'bn':
        image = require('../icons/flags/flags_iso/48/bn.png');
        break;
      case 'cf':
        image = require('../icons/flags/flags_iso/48/cf.png');
        break;
      case 'cx':
        image = require('../icons/flags/flags_iso/48/cx.png');
        break;
      case 'er':
        image = require('../icons/flags/flags_iso/48/er.png');
        break;
      case 'gf':
        image = require('../icons/flags/flags_iso/48/gf.png');
        break;
      case 'gw':
        image = require('../icons/flags/flags_iso/48/gw.png');
        break;
      case 'io':
        image = require('../icons/flags/flags_iso/48/io.png');
        break;
      case 'km':
        image = require('../icons/flags/flags_iso/48/km.png');
        break;
      case 'ls':
        image = require('../icons/flags/flags_iso/48/ls.png');
        break;
      case 'ml':
        image = require('../icons/flags/flags_iso/48/ml.png');
        break;
      case 'my':
        image = require('../icons/flags/flags_iso/48/my.png');
        break;
      case 'nz':
        image = require('../icons/flags/flags_iso/48/nz.png');
        break;
      case 'pt':
        image = require('../icons/flags/flags_iso/48/pt.png');
        break;
      case 'se':
        image = require('../icons/flags/flags_iso/48/se.png');
        break;
      case 'sv':
        image = require('../icons/flags/flags_iso/48/sv.png');
        break;
      case 'tn':
        image = require('../icons/flags/flags_iso/48/tn.png');
        break;
      case 'va':
        image = require('../icons/flags/flags_iso/48/va.png');
        break;
      case 'zw':
        image = require('../icons/flags/flags_iso/48/zw.png');
        break;
      case 'ag':
        image = require('../icons/flags/flags_iso/48/ag.png');
        break;
      case 'az':
        image = require('../icons/flags/flags_iso/48/az.png');
        break;
      case 'bo':
        image = require('../icons/flags/flags_iso/48/bo.png');
        break;
      case 'cg':
        image = require('../icons/flags/flags_iso/48/cg.png');
        break;
      case 'cy':
        image = require('../icons/flags/flags_iso/48/cy.png');
        break;
      case 'es':
        image = require('../icons/flags/flags_iso/48/es.png');
        break;
      case 'gg':
        image = require('../icons/flags/flags_iso/48/gg.png');
        break;
      case 'gy':
        image = require('../icons/flags/flags_iso/48/gy.png');
        break;
      case 'iq':
        image = require('../icons/flags/flags_iso/48/iq.png');
        break;
      case 'kn':
        image = require('../icons/flags/flags_iso/48/kn.png');
        break;
      case 'lt':
        image = require('../icons/flags/flags_iso/48/lt.png');
        break;
      case 'mm':
        image = require('../icons/flags/flags_iso/48/mm.png');
        break;
      case 'mz':
        image = require('../icons/flags/flags_iso/48/mz.png');
        break;
      case 'om':
        image = require('../icons/flags/flags_iso/48/om.png');
        break;
      case 'pw':
        image = require('../icons/flags/flags_iso/48/pw.png');
        break;
      case 'sg':
        image = require('../icons/flags/flags_iso/48/sg.png');
        break;
      case 'sx':
        image = require('../icons/flags/flags_iso/48/sx.png');
        break;
      case 'to':
        image = require('../icons/flags/flags_iso/48/to.png');
        break;
      case 'vc':
        image = require('../icons/flags/flags_iso/48/vc.png');
        break;
      case 'ai':
        image = require('../icons/flags/flags_iso/48/ai.png');
        break;
      case 'ba':
        image = require('../icons/flags/flags_iso/48/ba.png');
        break;
      case 'bq':
        image = require('../icons/flags/flags_iso/48/bq.png');
        break;
      case 'ch':
        image = require('../icons/flags/flags_iso/48/ch.png');
        break;
      case 'cz':
        image = require('../icons/flags/flags_iso/48/cz.png');
        break;
      case 'et':
        image = require('../icons/flags/flags_iso/48/et.png');
        break;
      case 'gh':
        image = require('../icons/flags/flags_iso/48/gh.png');
        break;
      case 'hk':
        image = require('../icons/flags/flags_iso/48/hk.png');
        break;
      case 'ir':
        image = require('../icons/flags/flags_iso/48/ir.png');
        break;
      case 'kp':
        image = require('../icons/flags/flags_iso/48/kp.png');
        break;
      case 'lu':
        image = require('../icons/flags/flags_iso/48/lu.png');
        break;
      case 'mn':
        image = require('../icons/flags/flags_iso/48/mn.png');
        break;
      case 'na':
        image = require('../icons/flags/flags_iso/48/na.png');
        break;
      case 'pa':
        image = require('../icons/flags/flags_iso/48/pa.png');
        break;
      case 'py':
        image = require('../icons/flags/flags_iso/48/py.png');
        break;
      case 'sh':
        image = require('../icons/flags/flags_iso/48/sh.png');
        break;
      case 'sy':
        image = require('../icons/flags/flags_iso/48/sy.png');
        break;
      case 'tr':
        image = require('../icons/flags/flags_iso/48/tr.png');
        break;
      case 've':
        image = require('../icons/flags/flags_iso/48/ve.png');
        break;
      case 'al':
        image = require('../icons/flags/flags_iso/48/al.png');
        break;
      case 'bb':
        image = require('../icons/flags/flags_iso/48/bb.png');
        break;
      case 'br':
        image = require('../icons/flags/flags_iso/48/br.png');
        break;
      case 'ci':
        image = require('../icons/flags/flags_iso/48/ci.png');
        break;
      case 'de':
        image = require('../icons/flags/flags_iso/48/de.png');
        break;
      case 'fi':
        image = require('../icons/flags/flags_iso/48/fi.png');
        break;
      case 'gi':
        image = require('../icons/flags/flags_iso/48/gi.png');
        break;
      case 'hm':
        image = require('../icons/flags/flags_iso/48/hm.png');
        break;
      case 'is':
        image = require('../icons/flags/flags_iso/48/is.png');
        break;
      case 'kr':
        image = require('../icons/flags/flags_iso/48/kr.png');
        break;
      case 'lv':
        image = require('../icons/flags/flags_iso/48/lv.png');
        break;
      case 'mo':
        image = require('../icons/flags/flags_iso/48/mo.png');
        break;
      case 'nc':
        image = require('../icons/flags/flags_iso/48/nc.png');
        break;
      case 'pe':
        image = require('../icons/flags/flags_iso/48/pe.png');
        break;
      case 'qa':
        image = require('../icons/flags/flags_iso/48/qa.png');
        break;
      case 'si':
        image = require('../icons/flags/flags_iso/48/si.png');
        break;
      case 'sz':
        image = require('../icons/flags/flags_iso/48/sz.png');
        break;
      case 'tt':
        image = require('../icons/flags/flags_iso/48/tt.png');
        break;
      case 'vg':
        image = require('../icons/flags/flags_iso/48/vg.png');
        break;
      case 'am':
        image = require('../icons/flags/flags_iso/48/am.png');
        break;
      case 'bd':
        image = require('../icons/flags/flags_iso/48/bd.png');
        break;
      case 'bs':
        image = require('../icons/flags/flags_iso/48/bs.png');
        break;
      case 'ck':
        image = require('../icons/flags/flags_iso/48/ck.png');
        break;
      case 'dj':
        image = require('../icons/flags/flags_iso/48/dj.png');
        break;
      case 'fj':
        image = require('../icons/flags/flags_iso/48/fj.png');
        break;
      case 'gl':
        image = require('../icons/flags/flags_iso/48/gl.png');
        break;
      case 'hn':
        image = require('../icons/flags/flags_iso/48/hn.png');
        break;
      case 'it':
        image = require('../icons/flags/flags_iso/48/it.png');
        break;
      case 'kw':
        image = require('../icons/flags/flags_iso/48/kw.png');
        break;
      case 'ly':
        image = require('../icons/flags/flags_iso/48/ly.png');
        break;
      case 'mp':
        image = require('../icons/flags/flags_iso/48/mp.png');
        break;
      case 'ne':
        image = require('../icons/flags/flags_iso/48/ne.png');
        break;
      case 'pf':
        image = require('../icons/flags/flags_iso/48/pf.png');
        break;
      case 're':
        image = require('../icons/flags/flags_iso/48/re.png');
        break;
      case 'sj':
        image = require('../icons/flags/flags_iso/48/sj.png');
        break;
      case 'tc':
        image = require('../icons/flags/flags_iso/48/tc.png');
        break;
      case 'tv':
        image = require('../icons/flags/flags_iso/48/tv.png');
        break;
      case 'vi':
        image = require('../icons/flags/flags_iso/48/vi.png');
        break;
      case 'an':
        image = require('../icons/flags/flags_iso/48/an.png');
        break;
      case 'be':
        image = require('../icons/flags/flags_iso/48/be.png');
        break;
      case 'bt':
        image = require('../icons/flags/flags_iso/48/bt.png');
        break;
      case 'cl':
        image = require('../icons/flags/flags_iso/48/cl.png');
        break;
      case 'dk':
        image = require('../icons/flags/flags_iso/48/dk.png');
        break;
      case 'fk':
        image = require('../icons/flags/flags_iso/48/fk.png');
        break;
      case 'gm':
        image = require('../icons/flags/flags_iso/48/gm.png');
        break;
      case 'hr':
        image = require('../icons/flags/flags_iso/48/hr.png');
        break;
      case 'je':
        image = require('../icons/flags/flags_iso/48/je.png');
        break;
      case 'ky':
        image = require('../icons/flags/flags_iso/48/ky.png');
        break;
      case 'ma':
        image = require('../icons/flags/flags_iso/48/ma.png');
        break;
      case 'mq':
        image = require('../icons/flags/flags_iso/48/mq.png');
        break;
      case 'nf':
        image = require('../icons/flags/flags_iso/48/nf.png');
        break;
      case 'pg':
        image = require('../icons/flags/flags_iso/48/pg.png');
        break;
      case 'ro':
        image = require('../icons/flags/flags_iso/48/ro.png');
        break;
      case 'sk':
        image = require('../icons/flags/flags_iso/48/sk.png');
        break;
      case 'td':
        image = require('../icons/flags/flags_iso/48/td.png');
        break;
      case 'tw':
        image = require('../icons/flags/flags_iso/48/tw.png');
        break;
      case 'vn':
        image = require('../icons/flags/flags_iso/48/vn.png');
        break;
      case 'ao':
        image = require('../icons/flags/flags_iso/48/ao.png');
        break;
      case 'bf':
        image = require('../icons/flags/flags_iso/48/bf.png');
        break;
      case 'bv':
        image = require('../icons/flags/flags_iso/48/bv.png');
        break;
      case 'cm':
        image = require('../icons/flags/flags_iso/48/cm.png');
        break;
      case 'dm':
        image = require('../icons/flags/flags_iso/48/dm.png');
        break;
      case 'fm':
        image = require('../icons/flags/flags_iso/48/fm.png');
        break;
      case 'gn':
        image = require('../icons/flags/flags_iso/48/gn.png');
        break;
      case 'ht':
        image = require('../icons/flags/flags_iso/48/ht.png');
        break;
      case 'jm':
        image = require('../icons/flags/flags_iso/48/jm.png');
        break;
      case 'kz':
        image = require('../icons/flags/flags_iso/48/kz.png');
        break;
      case 'mc':
        image = require('../icons/flags/flags_iso/48/mc.png');
        break;
      case 'mr':
        image = require('../icons/flags/flags_iso/48/mr.png');
        break;
      case 'ng':
        image = require('../icons/flags/flags_iso/48/ng.png');
        break;
      case 'ph':
        image = require('../icons/flags/flags_iso/48/ph.png');
        break;
      case 'rs':
        image = require('../icons/flags/flags_iso/48/rs.png');
        break;
      case 'sl':
        image = require('../icons/flags/flags_iso/48/sl.png');
        break;
      case 'tf':
        image = require('../icons/flags/flags_iso/48/tf.png');
        break;
      case 'tz':
        image = require('../icons/flags/flags_iso/48/tz.png');
        break;
      case 'vu':
        image = require('../icons/flags/flags_iso/48/vu.png');
        break;
      case 'aq':
        image = require('../icons/flags/flags_iso/48/aq.png');
        break;
      case 'bg':
        image = require('../icons/flags/flags_iso/48/bg.png');
        break;
      case 'bw':
        image = require('../icons/flags/flags_iso/48/bw.png');
        break;
      case 'cn':
        image = require('../icons/flags/flags_iso/48/cn.png');
        break;
      case 'do':
        image = require('../icons/flags/flags_iso/48/do.png');
        break;
      case 'fo':
        image = require('../icons/flags/flags_iso/48/fo.png');
        break;
      case 'gp':
        image = require('../icons/flags/flags_iso/48/gp.png');
        break;
      case 'hu':
        image = require('../icons/flags/flags_iso/48/hu.png');
        break;
      case 'jo':
        image = require('../icons/flags/flags_iso/48/jo.png');
        break;
      case 'la':
        image = require('../icons/flags/flags_iso/48/la.png');
        break;
      case 'md':
        image = require('../icons/flags/flags_iso/48/md.png');
        break;
      case 'ms':
        image = require('../icons/flags/flags_iso/48/ms.png');
        break;
      case 'ni':
        image = require('../icons/flags/flags_iso/48/ni.png');
        break;
      case 'pk':
        image = require('../icons/flags/flags_iso/48/pk.png');
        break;
      case 'ru':
        image = require('../icons/flags/flags_iso/48/ru.png');
        break;
      case 'sm':
        image = require('../icons/flags/flags_iso/48/sm.png');
        break;
      case 'tg':
        image = require('../icons/flags/flags_iso/48/tg.png');
        break;
      case 'ua':
        image = require('../icons/flags/flags_iso/48/ua.png');
        break;
      case 'wf':
        image = require('../icons/flags/flags_iso/48/wf.png');
        break;
      case 'ar':
        image = require('../icons/flags/flags_iso/48/ar.png');
        break;
      case 'bh':
        image = require('../icons/flags/flags_iso/48/bh.png');
        break;
      case 'by':
        image = require('../icons/flags/flags_iso/48/by.png');
        break;
      case 'co':
        image = require('../icons/flags/flags_iso/48/co.png');
        break;
      case 'dz':
        image = require('../icons/flags/flags_iso/48/dz.png');
        break;
      case 'fr':
        image = require('../icons/flags/flags_iso/48/fr.png');
        break;
      case 'gq':
        image = require('../icons/flags/flags_iso/48/gq.png');
        break;
      case 'id':
        image = require('../icons/flags/flags_iso/48/id.png');
        break;
      case 'jp':
        image = require('../icons/flags/flags_iso/48/jp.png');
        break;
      case 'lb':
        image = require('../icons/flags/flags_iso/48/lb.png');
        break;
      case 'me':
        image = require('../icons/flags/flags_iso/48/me.png');
        break;
      case 'mt':
        image = require('../icons/flags/flags_iso/48/mt.png');
        break;
      case 'nl':
        image = require('../icons/flags/flags_iso/48/nl.png');
        break;
      case 'pl':
        image = require('../icons/flags/flags_iso/48/pl.png');
        break;
      case 'rw':
        image = require('../icons/flags/flags_iso/48/rw.png');
        break;
      case 'sn':
        image = require('../icons/flags/flags_iso/48/sn.png');
        break;
      case 'th':
        image = require('../icons/flags/flags_iso/48/th.png');
        break;
      case 'ug':
        image = require('../icons/flags/flags_iso/48/ug.png');
        break;
      case 'ws':
        image = require('../icons/flags/flags_iso/48/ws.png');
        break;
      case 'as':
        image = require('../icons/flags/flags_iso/48/as.png');
        break;
      case 'bi':
        image = require('../icons/flags/flags_iso/48/bi.png');
        break;
      case 'bz':
        image = require('../icons/flags/flags_iso/48/bz.png');
        break;
      case 'cr':
        image = require('../icons/flags/flags_iso/48/cr.png');
        break;
      case 'ec':
        image = require('../icons/flags/flags_iso/48/ec.png');
        break;
      case 'ga':
        image = require('../icons/flags/flags_iso/48/ga.png');
        break;
      case 'gr':
        image = require('../icons/flags/flags_iso/48/gr.png');
        break;
      case 'ie':
        image = require('../icons/flags/flags_iso/48/ie.png');
        break;
      case 'ke':
        image = require('../icons/flags/flags_iso/48/ke.png');
        break;
      case 'lc':
        image = require('../icons/flags/flags_iso/48/lc.png');
        break;
      case 'mf':
        image = require('../icons/flags/flags_iso/48/mf.png');
        break;
      case 'mu':
        image = require('../icons/flags/flags_iso/48/mu.png');
        break;
      case 'no':
        image = require('../icons/flags/flags_iso/48/no.png');
        break;
      case 'pm':
        image = require('../icons/flags/flags_iso/48/pm.png');
        break;
      case 'sa':
        image = require('../icons/flags/flags_iso/48/sa.png');
        break;
      case 'so':
        image = require('../icons/flags/flags_iso/48/so.png');
        break;
      case 'tj':
        image = require('../icons/flags/flags_iso/48/tj.png');
        break;
      case 'um':
        image = require('../icons/flags/flags_iso/48/um.png');
        break;
      case 'ye':
        image = require('../icons/flags/flags_iso/48/ye.png');
        break;
      case 'at':
        image = require('../icons/flags/flags_iso/48/at.png');
        break;
      case 'bj':
        image = require('../icons/flags/flags_iso/48/bj.png');
        break;
      case 'ca':
        image = require('../icons/flags/flags_iso/48/ca.png');
        break;
      case 'cu':
        image = require('../icons/flags/flags_iso/48/cu.png');
        break;
      case 'ee':
        image = require('../icons/flags/flags_iso/48/ee.png');
        break;
      case 'gb':
        image = require('../icons/flags/flags_iso/48/gb.png');
        break;
      case 'gs':
        image = require('../icons/flags/flags_iso/48/gs.png');
        break;
      case 'il':
        image = require('../icons/flags/flags_iso/48/il.png');
        break;
      case 'kg':
        image = require('../icons/flags/flags_iso/48/kg.png');
        break;
      case 'li':
        image = require('../icons/flags/flags_iso/48/li.png');
        break;
      case 'mg':
        image = require('../icons/flags/flags_iso/48/mg.png');
        break;
      case 'mv':
        image = require('../icons/flags/flags_iso/48/mv.png');
        break;
      case 'np':
        image = require('../icons/flags/flags_iso/48/np.png');
        break;
      case 'pn':
        image = require('../icons/flags/flags_iso/48/pn.png');
        break;
      case 'sb':
        image = require('../icons/flags/flags_iso/48/sb.png');
        break;
      case 'sr':
        image = require('../icons/flags/flags_iso/48/sr.png');
        break;
      case 'tk':
        image = require('../icons/flags/flags_iso/48/tk.png');
        break;
      case 'us':
        image = require('../icons/flags/flags_iso/48/us.png');
        break;
      case 'yt':
        image = require('../icons/flags/flags_iso/48/yt.png');
        break;
      default:
        image = null;
    }


    if (image === null) {
      return (
        <TouchableHighlight
          key={rowData.alpha2}
          onPress={() => this.onSelect(rowData.name, rowData[this.props.code])}
          underlayColor={this.getStyle('underlayColor').pop()}

          style={this.getStyle(['row'])}
        >
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <View
              style={{
                backgroundColor: '#c9c9c9',
                height: 20,
                width: 30,
                marginLeft: 10,
                marginRight: 10,
              }}
            />

            <Text numberOfLines={1} style={{
              flex: 1,
            }}>{rowData.name}</Text>
          </View>
        </TouchableHighlight>
      );
    } else {
      return (
        <TouchableHighlight
          key={rowData.alpha2}

          onPress={() => this.onSelect(rowData.name, rowData[this.props.code])}
          underlayColor={this.getStyle('underlayColor').pop()}

          style={this.getStyle(['row'])}
        >
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Image
              key={rowData.alpha2+'Image'}
              resizeMode={Image.resizeMode.contain}
              source={image}
              style={{
                height: 30,
                width: 30,
                marginLeft: 10,
                marginRight: 10,
              }}
            />
            <Text numberOfLines={1} style={{
              flex: 1,
            }}>{rowData.name}</Text>
          </View>
        </TouchableHighlight>
      );
    }
  },

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows([]),
      search: '',
    };
  },

  updateRows(text = '') {
    if (text.length === 0) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows([]),
      });
      return;
    }

    var results = [];

    for (let i = 0; i < countries.length; i++) {
      if (countries[i].name.toLowerCase().indexOf(text.trim().toLowerCase()) !== -1) {
        results.push(countries[i]);
        if (results.length === 10) { // max results
          break;
        }
      }
    }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(results),
    });
  },


  doSearch(text) {
    // console.log(text);
    this.setState({search: text});
    this.updateRows(text);
  },

  renderHeader() {
    return (
      <View
        style={this.getStyle(['textInputContainer'])}
      >
        <TextInput
          autoFocus={this.props.autoFocus}

          style={this.getStyle(['textInput'])}

          placeholder='Type a country name...'

          onChangeText={this.doSearch}
          value={this.state.search}

          clearButtonMode="while-editing"

        />
      </View>
    );
  },

  renderSeparator(sectionId, rowId) {
    return (
      <View
        key={`sep:${sectionId}:${rowId}`}
        style={this.getStyle(['separator'])}
      />
    );
  },

  render: function() {
    return (
      <View
        style={this.getStyle(['container'])}
      >
        {this.renderHeader()}
        <ListView
          style={this.getStyle(['listView'])}

          dataSource={this.state.dataSource}
          renderRow={this.renderRow}

          automaticallyAdjustContentInsets={false}

          initialListSize={10}
          pageSize={10}

          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"

          renderSeparator={this.renderSeparator}

          enableEmptySections={true}

        />
      </View>

    );
  },

  defaultStyles: {
    container: {
      flex: 1,
    },
    listView: {
      flex: 1,
    },
    textInputContainer: {
      backgroundColor: '#C9C9CE',
      height: 44,
      borderTopColor: '#7e7e7e',
      borderBottomColor: '#b5b5b5',
      borderTopWidth: 1 / PixelRatio.get(),
      borderBottomWidth: 1 / PixelRatio.get(),
    },
    textInput: {
      backgroundColor: '#FFFFFF',
      height: 28,
      borderRadius: 5,
      paddingTop: 4.5,
      paddingBottom: 4.5,
      paddingLeft: 10,
      paddingRight: 10,
      marginTop: 7.5,
      marginLeft: 8,
      marginRight: 8,
      fontSize: 15,
    },
    row: {
      height: 44,
      // padding: 10,
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    separator: {
      height: 0.5,
      backgroundColor: '#9ba1ac',
    },
    underlayColor: '#c7c7cc',
  },
});

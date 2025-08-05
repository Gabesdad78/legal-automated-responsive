export interface State {
  name: string;
  abbreviation: string;
  counties: County[];
}

export interface County {
  name: string;
  fips: string;
  court_info?: {
    name: string;
    address: string;
    phone: string;
    website?: string;
  };
}

// Comprehensive list of states with multiple counties
export const comprehensiveStates: State[] = [
  {
    name: "Alabama",
    abbreviation: "AL",
    counties: [
      { name: "Jefferson", fips: "01073" },
      { name: "Madison", fips: "01089" },
      { name: "Mobile", fips: "01097" },
      { name: "Montgomery", fips: "01101" },
      { name: "Shelby", fips: "01117" },
      { name: "Tuscaloosa", fips: "01125" },
      { name: "Baldwin", fips: "01003" },
      { name: "Lee", fips: "01081" },
      { name: "Morgan", fips: "01103" },
      { name: "Calhoun", fips: "01015" }
    ]
  },
  {
    name: "Alaska",
    abbreviation: "AK",
    counties: [
      { name: "Anchorage", fips: "02020" },
      { name: "Fairbanks North Star", fips: "02090" },
      { name: "Matanuska-Susitna", fips: "02170" },
      { name: "Kenai Peninsula", fips: "02122" },
      { name: "Juneau", fips: "02110" },
      { name: "Bethel", fips: "02050" },
      { name: "Kodiak Island", fips: "02150" },
      { name: "Nome", fips: "02180" },
      { name: "North Slope", fips: "02185" },
      { name: "Sitka", fips: "02220" }
    ]
  },
  {
    name: "Arizona",
    abbreviation: "AZ",
    counties: [
      { name: "Maricopa", fips: "04013" },
      { name: "Pima", fips: "04019" },
      { name: "Pinal", fips: "04021" },
      { name: "Yavapai", fips: "04025" },
      { name: "Yuma", fips: "04027" },
      { name: "Coconino", fips: "04005" },
      { name: "Mohave", fips: "04015" },
      { name: "Navajo", fips: "04017" },
      { name: "Apache", fips: "04001" },
      { name: "Cochise", fips: "04003" }
    ]
  },
  {
    name: "Arkansas",
    abbreviation: "AR",
    counties: [
      { name: "Pulaski", fips: "05119" },
      { name: "Benton", fips: "05007" },
      { name: "Washington", fips: "05143" },
      { name: "Faulkner", fips: "05045" },
      { name: "Saline", fips: "05125" },
      { name: "Garland", fips: "05051" },
      { name: "Lonoke", fips: "05085" },
      { name: "Craighead", fips: "05031" },
      { name: "Sebastian", fips: "05131" },
      { name: "White", fips: "05145" }
    ]
  },
  {
    name: "California",
    abbreviation: "CA",
    counties: [
      { name: "Los Angeles", fips: "06037" },
      { name: "San Diego", fips: "06073" },
      { name: "Orange", fips: "06059" },
      { name: "Riverside", fips: "06065" },
      { name: "San Bernardino", fips: "06071" },
      { name: "Santa Clara", fips: "06085" },
      { name: "Alameda", fips: "06001" },
      { name: "Sacramento", fips: "06067" },
      { name: "Contra Costa", fips: "06013" },
      { name: "Fresno", fips: "06019" }
    ]
  },
  {
    name: "Colorado",
    abbreviation: "CO",
    counties: [
      { name: "Denver", fips: "08031" },
      { name: "El Paso", fips: "08041" },
      { name: "Arapahoe", fips: "08005" },
      { name: "Jefferson", fips: "08059" },
      { name: "Adams", fips: "08001" },
      { name: "Douglas", fips: "08035" },
      { name: "Larimer", fips: "08069" },
      { name: "Weld", fips: "08123" },
      { name: "Boulder", fips: "08013" },
      { name: "Pueblo", fips: "08101" }
    ]
  },
  {
    name: "Connecticut",
    abbreviation: "CT",
    counties: [
      { name: "Hartford", fips: "09003" },
      { name: "Fairfield", fips: "09001" },
      { name: "New Haven", fips: "09009" },
      { name: "New London", fips: "09011" },
      { name: "Litchfield", fips: "09005" },
      { name: "Middlesex", fips: "09007" },
      { name: "Tolland", fips: "09013" },
      { name: "Windham", fips: "09015" }
    ]
  },
  {
    name: "Delaware",
    abbreviation: "DE",
    counties: [
      { name: "New Castle", fips: "10003" },
      { name: "Kent", fips: "10001" },
      { name: "Sussex", fips: "10005" }
    ]
  },
  {
    name: "Florida",
    abbreviation: "FL",
    counties: [
      { name: "Miami-Dade", fips: "12086" },
      { name: "Broward", fips: "12011" },
      { name: "Palm Beach", fips: "12099" },
      { name: "Hillsborough", fips: "12057" },
      { name: "Orange", fips: "12095" },
      { name: "Pinellas", fips: "12103" },
      { name: "Duval", fips: "12031" },
      { name: "Lee", fips: "12071" },
      { name: "Polk", fips: "12105" },
      { name: "Brevard", fips: "12009" }
    ]
  },
  {
    name: "Georgia",
    abbreviation: "GA",
    counties: [
      { name: "Fulton", fips: "13121" },
      { name: "Gwinnett", fips: "13135" },
      { name: "Cobb", fips: "13067" },
      { name: "DeKalb", fips: "13089" },
      { name: "Clayton", fips: "13063" },
      { name: "Chatham", fips: "13051" },
      { name: "Richmond", fips: "13245" },
      { name: "Muscogee", fips: "13215" },
      { name: "Bibb", fips: "13021" },
      { name: "Houston", fips: "13153" }
    ]
  },
  {
    name: "Hawaii",
    abbreviation: "HI",
    counties: [
      { name: "Honolulu", fips: "15003" },
      { name: "Hawaii", fips: "15001" },
      { name: "Maui", fips: "15009" },
      { name: "Kauai", fips: "15007" },
      { name: "Kalawao", fips: "15005" }
    ]
  },
  {
    name: "Idaho",
    abbreviation: "ID",
    counties: [
      { name: "Ada", fips: "16001" },
      { name: "Canyon", fips: "16027" },
      { name: "Kootenai", fips: "16055" },
      { name: "Bonneville", fips: "16019" },
      { name: "Bannock", fips: "16005" },
      { name: "Bingham", fips: "16011" },
      { name: "Gem", fips: "16045" },
      { name: "Twin Falls", fips: "16083" },
      { name: "Nez Perce", fips: "16069" },
      { name: "Latah", fips: "16057" }
    ]
  },
  {
    name: "Illinois",
    abbreviation: "IL",
    counties: [
      { name: "Cook", fips: "17031" },
      { name: "DuPage", fips: "17043" },
      { name: "Lake", fips: "17097" },
      { name: "Will", fips: "17197" },
      { name: "Kane", fips: "17089" },
      { name: "McHenry", fips: "17111" },
      { name: "Winnebago", fips: "17201" },
      { name: "Madison", fips: "17119" },
      { name: "St. Clair", fips: "17163" },
      { name: "Sangamon", fips: "17167" }
    ]
  },
  {
    name: "Indiana",
    abbreviation: "IN",
    counties: [
      { name: "Marion", fips: "18097" },
      { name: "Lake", fips: "18089" },
      { name: "Allen", fips: "18003" },
      { name: "Hamilton", fips: "18057" },
      { name: "St. Joseph", fips: "18141" },
      { name: "Elkhart", fips: "18039" },
      { name: "Vanderburgh", fips: "18163" },
      { name: "Tippecanoe", fips: "18157" },
      { name: "Hendricks", fips: "18063" },
      { name: "Johnson", fips: "18081" }
    ]
  },
  {
    name: "Iowa",
    abbreviation: "IA",
    counties: [
      { name: "Polk", fips: "19153" },
      { name: "Linn", fips: "19113" },
      { name: "Scott", fips: "19163" },
      { name: "Johnson", fips: "19103" },
      { name: "Woodbury", fips: "19193" },
      { name: "Black Hawk", fips: "19113" },
      { name: "Dubuque", fips: "19061" },
      { name: "Pottawattamie", fips: "19155" },
      { name: "Story", fips: "19169" },
      { name: "Dallas", fips: "19049" }
    ]
  },
  {
    name: "Kansas",
    abbreviation: "KS",
    counties: [
      { name: "Sedgwick", fips: "20173" },
      { name: "Johnson", fips: "20091" },
      { name: "Shawnee", fips: "20177" },
      { name: "Wyandotte", fips: "20209" },
      { name: "Riley", fips: "20161" },
      { name: "Douglas", fips: "20045" },
      { name: "Leavenworth", fips: "20103" },
      { name: "Butler", fips: "20015" },
      { name: "Saline", fips: "20169" },
      { name: "Harvey", fips: "20079" }
    ]
  },
  {
    name: "Kentucky",
    abbreviation: "KY",
    counties: [
      { name: "Jefferson", fips: "21111" },
      { name: "Fayette", fips: "20067" },
      { name: "Kenton", fips: "21117" },
      { name: "Warren", fips: "21227" },
      { name: "Hardin", fips: "21093" },
      { name: "Boone", fips: "21015" },
      { name: "Campbell", fips: "21037" },
      { name: "Madison", fips: "21151" },
      { name: "Bullitt", fips: "21029" },
      { name: "Daviess", fips: "21059" }
    ]
  },
  {
    name: "Louisiana",
    abbreviation: "LA",
    counties: [
      { name: "Orleans", fips: "22071" },
      { name: "East Baton Rouge", fips: "22033" },
      { name: "Jefferson", fips: "22051" },
      { name: "Caddo", fips: "22017" },
      { name: "Calcasieu", fips: "22019" },
      { name: "Lafayette", fips: "22055" },
      { name: "St. Tammany", fips: "22103" },
      { name: "Ouachita", fips: "22073" },
      { name: "Rapides", fips: "22079" },
      { name: "Terrebonne", fips: "22109" }
    ]
  },
  {
    name: "Maine",
    abbreviation: "ME",
    counties: [
      { name: "Cumberland", fips: "23005" },
      { name: "York", fips: "23031" },
      { name: "Penobscot", fips: "23019" },
      { name: "Kennebec", fips: "23011" },
      { name: "Androscoggin", fips: "23001" },
      { name: "Aroostook", fips: "23003" },
      { name: "Sagadahoc", fips: "23023" },
      { name: "Hancock", fips: "23009" },
      { name: "Oxford", fips: "23017" },
      { name: "Somerset", fips: "23025" }
    ]
  },
  {
    name: "Maryland",
    abbreviation: "MD",
    counties: [
      { name: "Baltimore", fips: "24005" },
      { name: "Montgomery", fips: "24031" },
      { name: "Prince George's", fips: "24033" },
      { name: "Anne Arundel", fips: "24003" },
      { name: "Howard", fips: "24027" },
      { name: "Baltimore City", fips: "24510" },
      { name: "Frederick", fips: "24021" },
      { name: "Harford", fips: "24025" },
      { name: "Carroll", fips: "24013" },
      { name: "Charles", fips: "24017" }
    ]
  },
  {
    name: "Massachusetts",
    abbreviation: "MA",
    counties: [
      { name: "Suffolk", fips: "25025" },
      { name: "Middlesex", fips: "25017" },
      { name: "Worcester", fips: "25027" },
      { name: "Essex", fips: "25009" },
      { name: "Norfolk", fips: "25021" },
      { name: "Bristol", fips: "25005" },
      { name: "Plymouth", fips: "25023" },
      { name: "Hampden", fips: "25013" },
      { name: "Barnstable", fips: "25001" },
      { name: "Berkshire", fips: "25003" }
    ]
  },
  {
    name: "Michigan",
    abbreviation: "MI",
    counties: [
      { name: "Wayne", fips: "26163" },
      { name: "Oakland", fips: "26125" },
      { name: "Macomb", fips: "26099" },
      { name: "Kent", fips: "26081" },
      { name: "Genesee", fips: "26049" },
      { name: "Washtenaw", fips: "26161" },
      { name: "Ingham", fips: "26065" },
      { name: "Saginaw", fips: "26145" },
      { name: "Ottawa", fips: "26139" },
      { name: "Kalamazoo", fips: "26077" }
    ]
  },
  {
    name: "Minnesota",
    abbreviation: "MN",
    counties: [
      { name: "Hennepin", fips: "27053" },
      { name: "Ramsey", fips: "27123" },
      { name: "Dakota", fips: "27037" },
      { name: "Anoka", fips: "27003" },
      { name: "Washington", fips: "27163" },
      { name: "Olmsted", fips: "27109" },
      { name: "Stearns", fips: "27145" },
      { name: "Scott", fips: "27139" },
      { name: "Wright", fips: "27171" },
      { name: "St. Louis", fips: "27137" }
    ]
  },
  {
    name: "Mississippi",
    abbreviation: "MS",
    counties: [
      { name: "Hinds", fips: "28049" },
      { name: "Harrison", fips: "28047" },
      { name: "DeSoto", fips: "28033" },
      { name: "Rankin", fips: "28121" },
      { name: "Jackson", fips: "28059" },
      { name: "Madison", fips: "28089" },
      { name: "Lafayette", fips: "28071" },
      { name: "Forrest", fips: "28035" },
      { name: "Jones", fips: "28067" },
      { name: "Warren", fips: "28149" }
    ]
  },
  {
    name: "Missouri",
    abbreviation: "MO",
    counties: [
      { name: "St. Louis", fips: "29189" },
      { name: "Jackson", fips: "29095" },
      { name: "St. Charles", fips: "29183" },
      { name: "St. Louis City", fips: "29510" },
      { name: "Greene", fips: "29077" },
      { name: "Clay", fips: "29047" },
      { name: "Platte", fips: "29165" },
      { name: "Boone", fips: "29019" },
      { name: "Jasper", fips: "29097" },
      { name: "Buchanan", fips: "29021" }
    ]
  },
  {
    name: "Montana",
    abbreviation: "MT",
    counties: [
      { name: "Yellowstone", fips: "30111" },
      { name: "Missoula", fips: "30063" },
      { name: "Cascade", fips: "30013" },
      { name: "Flathead", fips: "30029" },
      { name: "Gallatin", fips: "30031" },
      { name: "Lewis and Clark", fips: "30049" },
      { name: "Ravalli", fips: "30081" },
      { name: "Silver Bow", fips: "30093" },
      { name: "Lake", fips: "30047" },
      { name: "Lincoln", fips: "30053" }
    ]
  },
  {
    name: "Nebraska",
    abbreviation: "NE",
    counties: [
      { name: "Douglas", fips: "31055" },
      { name: "Lancaster", fips: "31109" },
      { name: "Sarpy", fips: "31153" },
      { name: "Hall", fips: "31079" },
      { name: "Buffalo", fips: "31019" },
      { name: "Platte", fips: "31141" },
      { name: "Dodge", fips: "31053" },
      { name: "Madison", fips: "31119" },
      { name: "Dawson", fips: "31047" },
      { name: "Scotts Bluff", fips: "31157" }
    ]
  },
  {
    name: "Nevada",
    abbreviation: "NV",
    counties: [
      { name: "Clark", fips: "32003" },
      { name: "Washoe", fips: "32031" },
      { name: "Carson City", fips: "32510" },
      { name: "Elko", fips: "32007" },
      { name: "Douglas", fips: "32005" },
      { name: "Lyon", fips: "32019" },
      { name: "Humboldt", fips: "32013" },
      { name: "Nye", fips: "32023" },
      { name: "Churchill", fips: "32001" },
      { name: "White Pine", fips: "32033" }
    ]
  },
  {
    name: "New Hampshire",
    abbreviation: "NH",
    counties: [
      { name: "Hillsborough", fips: "33011" },
      { name: "Rockingham", fips: "33015" },
      { name: "Merrimack", fips: "33013" },
      { name: "Strafford", fips: "33017" },
      { name: "Cheshire", fips: "33005" },
      { name: "Grafton", fips: "33009" },
      { name: "Belknap", fips: "33001" },
      { name: "Carroll", fips: "33003" },
      { name: "Coos", fips: "33007" },
      { name: "Sullivan", fips: "33019" }
    ]
  },
  {
    name: "New Jersey",
    abbreviation: "NJ",
    counties: [
      { name: "Essex", fips: "34013" },
      { name: "Bergen", fips: "34003" },
      { name: "Middlesex", fips: "34023" },
      { name: "Hudson", fips: "34017" },
      { name: "Monmouth", fips: "34025" },
      { name: "Ocean", fips: "34029" },
      { name: "Union", fips: "34039" },
      { name: "Passaic", fips: "34031" },
      { name: "Morris", fips: "34027" },
      { name: "Camden", fips: "34007" }
    ]
  },
  {
    name: "New Mexico",
    abbreviation: "NM",
    counties: [
      { name: "Bernalillo", fips: "35001" },
      { name: "Dona Ana", fips: "35013" },
      { name: "Santa Fe", fips: "35049" },
      { name: "Sandoval", fips: "35043" },
      { name: "San Juan", fips: "35045" },
      { name: "Valencia", fips: "35061" },
      { name: "Lea", fips: "35025" },
      { name: "Eddy", fips: "35015" },
      { name: "Chaves", fips: "35005" },
      { name: "Otero", fips: "35035" }
    ]
  },
  {
    name: "New York",
    abbreviation: "NY",
    counties: [
      { name: "New York", fips: "36061" },
      { name: "Kings", fips: "36047" },
      { name: "Queens", fips: "36081" },
      { name: "Bronx", fips: "36005" },
      { name: "Richmond", fips: "36085" },
      { name: "Nassau", fips: "36059" },
      { name: "Suffolk", fips: "36103" },
      { name: "Westchester", fips: "36119" },
      { name: "Erie", fips: "36029" },
      { name: "Monroe", fips: "36055" }
    ]
  },
  {
    name: "North Carolina",
    abbreviation: "NC",
    counties: [
      { name: "Mecklenburg", fips: "37119" },
      { name: "Wake", fips: "37183" },
      { name: "Guilford", fips: "37081" },
      { name: "Forsyth", fips: "37067" },
      { name: "Cumberland", fips: "37051" },
      { name: "Durham", fips: "37063" },
      { name: "Buncombe", fips: "37021" },
      { name: "Union", fips: "37179" },
      { name: "Gaston", fips: "37071" },
      { name: "New Hanover", fips: "37129" }
    ]
  },
  {
    name: "North Dakota",
    abbreviation: "ND",
    counties: [
      { name: "Cass", fips: "38017" },
      { name: "Burleigh", fips: "38015" },
      { name: "Grand Forks", fips: "38035" },
      { name: "Ward", fips: "38101" },
      { name: "Morton", fips: "38059" },
      { name: "Stark", fips: "38089" },
      { name: "Williams", fips: "38105" },
      { name: "McKenzie", fips: "38053" },
      { name: "Ramsey", fips: "38071" },
      { name: "Sioux", fips: "38085" }
    ]
  },
  {
    name: "Ohio",
    abbreviation: "OH",
    counties: [
      { name: "Cuyahoga", fips: "39035" },
      { name: "Franklin", fips: "39049" },
      { name: "Hamilton", fips: "39061" },
      { name: "Summit", fips: "39153" },
      { name: "Montgomery", fips: "39113" },
      { name: "Lucas", fips: "39095" },
      { name: "Butler", fips: "39017" },
      { name: "Stark", fips: "39151" },
      { name: "Lorain", fips: "39093" },
      { name: "Warren", fips: "39165" }
    ]
  },
  {
    name: "Oklahoma",
    abbreviation: "OK",
    counties: [
      { name: "Oklahoma", fips: "40109" },
      { name: "Tulsa", fips: "40143" },
      { name: "Cleveland", fips: "40027" },
      { name: "Canadian", fips: "40017" },
      { name: "Comanche", fips: "40031" },
      { name: "Rogers", fips: "40131" },
      { name: "Wagoner", fips: "40145" },
      { name: "Pottawatomie", fips: "40125" },
      { name: "Payne", fips: "40119" },
      { name: "Creek", fips: "40037" }
    ]
  },
  {
    name: "Oregon",
    abbreviation: "OR",
    counties: [
      { name: "Multnomah", fips: "41051" },
      { name: "Washington", fips: "41067" },
      { name: "Clackamas", fips: "41005" },
      { name: "Lane", fips: "41039" },
      { name: "Marion", fips: "41047" },
      { name: "Jackson", fips: "41029" },
      { name: "Deschutes", fips: "41017" },
      { name: "Linn", fips: "41043" },
      { name: "Douglas", fips: "41019" },
      { name: "Yamhill", fips: "41071" }
    ]
  },
  {
    name: "Pennsylvania",
    abbreviation: "PA",
    counties: [
      { name: "Philadelphia", fips: "42101" },
      { name: "Allegheny", fips: "42003" },
      { name: "Montgomery", fips: "42091" },
      { name: "Bucks", fips: "42017" },
      { name: "Delaware", fips: "42045" },
      { name: "Lancaster", fips: "42071" },
      { name: "Chester", fips: "42029" },
      { name: "Lehigh", fips: "42077" },
      { name: "Berks", fips: "42011" },
      { name: "Dauphin", fips: "42043" }
    ]
  },
  {
    name: "Rhode Island",
    abbreviation: "RI",
    counties: [
      { name: "Providence", fips: "44007" },
      { name: "Kent", fips: "44003" },
      { name: "Washington", fips: "44009" },
      { name: "Bristol", fips: "44001" },
      { name: "Newport", fips: "44005" }
    ]
  },
  {
    name: "South Carolina",
    abbreviation: "SC",
    counties: [
      { name: "Greenville", fips: "45045" },
      { name: "Richland", fips: "45079" },
      { name: "Charleston", fips: "45019" },
      { name: "Spartanburg", fips: "45083" },
      { name: "Horry", fips: "45051" },
      { name: "York", fips: "45091" },
      { name: "Lexington", fips: "45063" },
      { name: "Anderson", fips: "45007" },
      { name: "Beaufort", fips: "45013" },
      { name: "Dorchester", fips: "45035" }
    ]
  },
  {
    name: "South Dakota",
    abbreviation: "SD",
    counties: [
      { name: "Minnehaha", fips: "46099" },
      { name: "Pennington", fips: "46103" },
      { name: "Lincoln", fips: "46083" },
      { name: "Brown", fips: "46013" },
      { name: "Brookings", fips: "46011" },
      { name: "Codington", fips: "46029" },
      { name: "Meade", fips: "46093" },
      { name: "Lawrence", fips: "46081" },
      { name: "Yankton", fips: "46135" },
      { name: "Hughes", fips: "46061" }
    ]
  },
  {
    name: "Tennessee",
    abbreviation: "TN",
    counties: [
      { name: "Davidson", fips: "47037" },
      { name: "Shelby", fips: "47157" },
      { name: "Knox", fips: "47093" },
      { name: "Hamilton", fips: "47065" },
      { name: "Rutherford", fips: "47149" },
      { name: "Williamson", fips: "47187" },
      { name: "Sullivan", fips: "47163" },
      { name: "Sumner", fips: "47165" },
      { name: "Wilson", fips: "47189" },
      { name: "Montgomery", fips: "47125" }
    ]
  },
  {
    name: "Texas",
    abbreviation: "TX",
    counties: [
      { name: "Harris", fips: "48201" },
      { name: "Dallas", fips: "48113" },
      { name: "Tarrant", fips: "48439" },
      { name: "Bexar", fips: "48029" },
      { name: "Travis", fips: "48453" },
      { name: "Collin", fips: "48085" },
      { name: "Denton", fips: "48121" },
      { name: "El Paso", fips: "48141" },
      { name: "Fort Bend", fips: "48157" },
      { name: "Montgomery", fips: "48339" }
    ]
  },
  {
    name: "Utah",
    abbreviation: "UT",
    counties: [
      { name: "Salt Lake", fips: "49035" },
      { name: "Utah", fips: "49049" },
      { name: "Davis", fips: "49011" },
      { name: "Weber", fips: "49057" },
      { name: "Washington", fips: "49053" },
      { name: "Cache", fips: "49005" },
      { name: "Tooele", fips: "49045" },
      { name: "Iron", fips: "49021" },
      { name: "Uintah", fips: "49047" },
      { name: "Summit", fips: "49043" }
    ]
  },
  {
    name: "Vermont",
    abbreviation: "VT",
    counties: [
      { name: "Chittenden", fips: "50007" },
      { name: "Rutland", fips: "50021" },
      { name: "Washington", fips: "50023" },
      { name: "Windham", fips: "50025" },
      { name: "Windsor", fips: "50027" },
      { name: "Franklin", fips: "50011" },
      { name: "Bennington", fips: "50003" },
      { name: "Addison", fips: "50001" },
      { name: "Orleans", fips: "50019" },
      { name: "Caledonia", fips: "50005" }
    ]
  },
  {
    name: "Virginia",
    abbreviation: "VA",
    counties: [
      { name: "Fairfax", fips: "51059" },
      { name: "Prince William", fips: "51153" },
      { name: "Loudoun", fips: "51107" },
      { name: "Chesterfield", fips: "51041" },
      { name: "Henrico", fips: "51087" },
      { name: "Arlington", fips: "51013" },
      { name: "Norfolk", fips: "51120" },
      { name: "Virginia Beach", fips: "51810" },
      { name: "Richmond", fips: "51760" },
      { name: "Alexandria", fips: "51510" }
    ]
  },
  {
    name: "Washington",
    abbreviation: "WA",
    counties: [
      { name: "King", fips: "53033" },
      { name: "Pierce", fips: "53053" },
      { name: "Snohomish", fips: "53061" },
      { name: "Spokane", fips: "53063" },
      { name: "Clark", fips: "53011" },
      { name: "Thurston", fips: "53067" },
      { name: "Kitsap", fips: "53035" },
      { name: "Yakima", fips: "53077" },
      { name: "Whatcom", fips: "53073" },
      { name: "Benton", fips: "53005" }
    ]
  },
  {
    name: "West Virginia",
    abbreviation: "WV",
    counties: [
      { name: "Kanawha", fips: "54039" },
      { name: "Berkeley", fips: "54003" },
      { name: "Monongalia", fips: "54061" },
      { name: "Cabell", fips: "54011" },
      { name: "Wood", fips: "54107" },
      { name: "Raleigh", fips: "54081" },
      { name: "Harrison", fips: "54033" },
      { name: "Marion", fips: "54049" },
      { name: "Mercer", fips: "54055" },
      { name: "Putnam", fips: "54079" }
    ]
  },
  {
    name: "Wisconsin",
    abbreviation: "WI",
    counties: [
      { name: "Milwaukee", fips: "55079" },
      { name: "Dane", fips: "55025" },
      { name: "Waukesha", fips: "55133" },
      { name: "Brown", fips: "55009" },
      { name: "Racine", fips: "55101" },
      { name: "Outagamie", fips: "55087" },
      { name: "Winnebago", fips: "55139" },
      { name: "Kenosha", fips: "55059" },
      { name: "Rock", fips: "55105" },
      { name: "Marathon", fips: "55073" }
    ]
  },
  {
    name: "Wyoming",
    abbreviation: "WY",
    counties: [
      { name: "Laramie", fips: "56021" },
      { name: "Natrona", fips: "56025" },
      { name: "Campbell", fips: "56005" },
      { name: "Sweetwater", fips: "56037" },
      { name: "Fremont", fips: "56013" },
      { name: "Albany", fips: "56001" },
      { name: "Sheridan", fips: "56033" },
      { name: "Park", fips: "56029" },
      { name: "Teton", fips: "56039" },
      { name: "Uinta", fips: "56041" }
    ]
  }
];

// Helper functions
export const getStateByAbbreviation = (abbreviation: string): State | undefined => {
  return comprehensiveStates.find(state => state.abbreviation === abbreviation.toUpperCase());
};

export const getStateByName = (name: string): State | undefined => {
  return comprehensiveStates.find(state => 
    state.name.toLowerCase() === name.toLowerCase() ||
    state.name.toLowerCase().includes(name.toLowerCase())
  );
};

export const getCountyByName = (stateName: string, countyName: string): County | undefined => {
  const state = getStateByName(stateName);
  if (!state) return undefined;
  
  return state.counties.find(county => 
    county.name.toLowerCase() === countyName.toLowerCase() ||
    county.name.toLowerCase().includes(countyName.toLowerCase())
  );
};

export const getAllStates = (): State[] => {
  return comprehensiveStates;
};

export const getCountiesForState = (stateName: string): County[] => {
  const state = getStateByName(stateName);
  return state ? state.counties : [];
}; 
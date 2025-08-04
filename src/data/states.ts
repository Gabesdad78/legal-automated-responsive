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

export const states: State[] = [
  {
    name: "Alabama",
    abbreviation: "AL",
    counties: [
      { name: "Autauga", fips: "01001" },
      { name: "Baldwin", fips: "01003" },
      { name: "Barbour", fips: "01005" },
      { name: "Bibb", fips: "01007" },
      { name: "Blount", fips: "01009" },
      { name: "Bullock", fips: "01011" },
      { name: "Butler", fips: "01013" },
      { name: "Calhoun", fips: "01015" },
      { name: "Chambers", fips: "01017" },
      { name: "Cherokee", fips: "01019" },
      { name: "Chilton", fips: "01021" },
      { name: "Choctaw", fips: "01023" },
      { name: "Clarke", fips: "01025" },
      { name: "Clay", fips: "01027" },
      { name: "Cleburne", fips: "01029" },
      { name: "Coffee", fips: "01031" },
      { name: "Colbert", fips: "01033" },
      { name: "Conecuh", fips: "01035" },
      { name: "Coosa", fips: "01037" },
      { name: "Covington", fips: "01039" },
      { name: "Crenshaw", fips: "01041" },
      { name: "Cullman", fips: "01043" },
      { name: "Dale", fips: "01045" },
      { name: "Dallas", fips: "01047" },
      { name: "DeKalb", fips: "01049" },
      { name: "Elmore", fips: "01051" },
      { name: "Escambia", fips: "01053" },
      { name: "Etowah", fips: "01055" },
      { name: "Fayette", fips: "01057" },
      { name: "Franklin", fips: "01059" },
      { name: "Geneva", fips: "01061" },
      { name: "Greene", fips: "01063" },
      { name: "Hale", fips: "01065" },
      { name: "Henry", fips: "01067" },
      { name: "Houston", fips: "01069" },
      { name: "Jackson", fips: "01071" },
      { name: "Jefferson", fips: "01073" },
      { name: "Lauderdale", fips: "01075" },
      { name: "Lawrence", fips: "01077" },
      { name: "Lee", fips: "01079" },
      { name: "Limestone", fips: "01081" },
      { name: "Lowndes", fips: "01083" },
      { name: "Macon", fips: "01085" },
      { name: "Madison", fips: "01087" },
      { name: "Marengo", fips: "01089" },
      { name: "Marion", fips: "01091" },
      { name: "Marshall", fips: "01093" },
      { name: "Mobile", fips: "01097" },
      { name: "Monroe", fips: "01099" },
      { name: "Montgomery", fips: "01101" },
      { name: "Morgan", fips: "01103" },
      { name: "Perry", fips: "01105" },
      { name: "Pickens", fips: "01107" },
      { name: "Pike", fips: "01109" },
      { name: "Randolph", fips: "01111" },
      { name: "Russell", fips: "01113" },
      { name: "Shelby", fips: "01117" },
      { name: "St. Clair", fips: "01115" },
      { name: "Sumter", fips: "01119" },
      { name: "Talladega", fips: "01121" },
      { name: "Tallapoosa", fips: "01123" },
      { name: "Tuscaloosa", fips: "01125" },
      { name: "Walker", fips: "01127" },
      { name: "Washington", fips: "01129" },
      { name: "Wilcox", fips: "01131" },
      { name: "Winston", fips: "01133" }
    ]
  },
  {
    name: "Alaska",
    abbreviation: "AK",
    counties: [
      { name: "Aleutians East", fips: "02013" },
      { name: "Aleutians West", fips: "02016" },
      { name: "Anchorage", fips: "02020" },
      { name: "Bethel", fips: "02050" },
      { name: "Bristol Bay", fips: "02060" },
      { name: "Denali", fips: "02068" },
      { name: "Dillingham", fips: "02070" },
      { name: "Fairbanks North Star", fips: "02090" },
      { name: "Haines", fips: "02100" },
      { name: "Hoonah-Angoon", fips: "02105" },
      { name: "Juneau", fips: "02110" },
      { name: "Kenai Peninsula", fips: "02122" },
      { name: "Ketchikan Gateway", fips: "02130" },
      { name: "Kodiak Island", fips: "02150" },
      { name: "Kusilvak", fips: "02158" },
      { name: "Lake and Peninsula", fips: "02164" },
      { name: "Matanuska-Susitna", fips: "02170" },
      { name: "Nome", fips: "02180" },
      { name: "North Slope", fips: "02185" },
      { name: "Northwest Arctic", fips: "02188" },
      { name: "Petersburg", fips: "02195" },
      { name: "Prince of Wales-Hyder", fips: "02198" },
      { name: "Sitka", fips: "02220" },
      { name: "Skagway", fips: "02230" },
      { name: "Southeast Fairbanks", fips: "02240" },
      { name: "Valdez-Cordova", fips: "02261" },
      { name: "Wrangell", fips: "02275" },
      { name: "Yakutat", fips: "02282" },
      { name: "Yukon-Koyukuk", fips: "02290" }
    ]
  },
  {
    name: "Arizona",
    abbreviation: "AZ",
    counties: [
      { name: "Apache", fips: "04001" },
      { name: "Cochise", fips: "04003" },
      { name: "Coconino", fips: "04005" },
      { name: "Gila", fips: "04007" },
      { name: "Graham", fips: "04009" },
      { name: "Greenlee", fips: "04011" },
      { name: "La Paz", fips: "04012" },
      { name: "Maricopa", fips: "04013" },
      { name: "Mohave", fips: "04015" },
      { name: "Navajo", fips: "04017" },
      { name: "Pima", fips: "04019" },
      { name: "Pinal", fips: "04021" },
      { name: "Santa Cruz", fips: "04023" },
      { name: "Yavapai", fips: "04025" },
      { name: "Yuma", fips: "04027" }
    ]
  },
  {
    name: "Arkansas",
    abbreviation: "AR",
    counties: [
      { name: "Arkansas", fips: "05001" },
      { name: "Ashley", fips: "05003" },
      { name: "Baxter", fips: "05005" },
      { name: "Benton", fips: "05007" },
      { name: "Boone", fips: "05009" },
      { name: "Bradley", fips: "05011" },
      { name: "Calhoun", fips: "05013" },
      { name: "Carroll", fips: "05015" },
      { name: "Chicot", fips: "05017" },
      { name: "Clark", fips: "05019" },
      { name: "Clay", fips: "05021" },
      { name: "Cleburne", fips: "05023" },
      { name: "Cleveland", fips: "05025" },
      { name: "Columbia", fips: "05027" },
      { name: "Conway", fips: "05029" },
      { name: "Craighead", fips: "05031" },
      { name: "Crawford", fips: "05033" },
      { name: "Crittenden", fips: "05035" },
      { name: "Cross", fips: "05037" },
      { name: "Dallas", fips: "05039" },
      { name: "Desha", fips: "05041" },
      { name: "Drew", fips: "05043" },
      { name: "Faulkner", fips: "05045" },
      { name: "Franklin", fips: "05047" },
      { name: "Fulton", fips: "05049" },
      { name: "Garland", fips: "05051" },
      { name: "Grant", fips: "05053" },
      { name: "Greene", fips: "05055" },
      { name: "Hempstead", fips: "05057" },
      { name: "Hot Spring", fips: "05059" },
      { name: "Howard", fips: "05061" },
      { name: "Independence", fips: "05063" },
      { name: "Izard", fips: "05065" },
      { name: "Jackson", fips: "05067" },
      { name: "Jefferson", fips: "05069" },
      { name: "Johnson", fips: "05071" },
      { name: "Lafayette", fips: "05073" },
      { name: "Lawrence", fips: "05075" },
      { name: "Lee", fips: "05077" },
      { name: "Lincoln", fips: "05079" },
      { name: "Little River", fips: "05081" },
      { name: "Logan", fips: "05083" },
      { name: "Lonoke", fips: "05085" },
      { name: "Madison", fips: "05087" },
      { name: "Marion", fips: "05089" },
      { name: "Miller", fips: "05091" },
      { name: "Mississippi", fips: "05093" },
      { name: "Monroe", fips: "05095" },
      { name: "Montgomery", fips: "05097" },
      { name: "Nevada", fips: "05099" },
      { name: "Newton", fips: "05101" },
      { name: "Ouachita", fips: "05103" },
      { name: "Perry", fips: "05105" },
      { name: "Phillips", fips: "05107" },
      { name: "Pike", fips: "05109" },
      { name: "Poinsett", fips: "05111" },
      { name: "Polk", fips: "05113" },
      { name: "Pope", fips: "05115" },
      { name: "Prairie", fips: "05117" },
      { name: "Pulaski", fips: "05119" },
      { name: "Randolph", fips: "05121" },
      { name: "Saline", fips: "05123" },
      { name: "Scott", fips: "05125" },
      { name: "Searcy", fips: "05127" },
      { name: "Sebastian", fips: "05129" },
      { name: "Sevier", fips: "05131" },
      { name: "Sharp", fips: "05133" },
      { name: "St. Francis", fips: "05135" },
      { name: "Stone", fips: "05137" },
      { name: "Union", fips: "05139" },
      { name: "Van Buren", fips: "05141" },
      { name: "Washington", fips: "05143" },
      { name: "White", fips: "05145" },
      { name: "Woodruff", fips: "05147" },
      { name: "Yell", fips: "05149" }
    ]
  },
  {
    name: "California",
    abbreviation: "CA",
    counties: [
      { name: "Alameda", fips: "06001" },
      { name: "Alpine", fips: "06003" },
      { name: "Amador", fips: "06005" },
      { name: "Butte", fips: "06007" },
      { name: "Calaveras", fips: "06009" },
      { name: "Colusa", fips: "06011" },
      { name: "Contra Costa", fips: "06013" },
      { name: "Del Norte", fips: "06015" },
      { name: "El Dorado", fips: "06017" },
      { name: "Fresno", fips: "06019" },
      { name: "Glenn", fips: "06021" },
      { name: "Humboldt", fips: "06023" },
      { name: "Imperial", fips: "06025" },
      { name: "Inyo", fips: "06027" },
      { name: "Kern", fips: "06029" },
      { name: "Kings", fips: "06031" },
      { name: "Lake", fips: "06033" },
      { name: "Lassen", fips: "06035" },
      { name: "Los Angeles", fips: "06037" },
      { name: "Madera", fips: "06039" },
      { name: "Marin", fips: "06041" },
      { name: "Mariposa", fips: "06043" },
      { name: "Mendocino", fips: "06045" },
      { name: "Merced", fips: "06047" },
      { name: "Modoc", fips: "06049" },
      { name: "Mono", fips: "06051" },
      { name: "Monterey", fips: "06053" },
      { name: "Napa", fips: "06055" },
      { name: "Nevada", fips: "06057" },
      { name: "Orange", fips: "06059" },
      { name: "Placer", fips: "06061" },
      { name: "Plumas", fips: "06063" },
      { name: "Riverside", fips: "06065" },
      { name: "Sacramento", fips: "06067" },
      { name: "San Benito", fips: "06069" },
      { name: "San Bernardino", fips: "06071" },
      { name: "San Diego", fips: "06073" },
      { name: "San Francisco", fips: "06075" },
      { name: "San Joaquin", fips: "06077" },
      { name: "San Luis Obispo", fips: "06079" },
      { name: "San Mateo", fips: "06081" },
      { name: "Santa Barbara", fips: "06083" },
      { name: "Santa Clara", fips: "06085" },
      { name: "Santa Cruz", fips: "06087" },
      { name: "Shasta", fips: "06089" },
      { name: "Sierra", fips: "06091" },
      { name: "Siskiyou", fips: "06093" },
      { name: "Solano", fips: "06095" },
      { name: "Sonoma", fips: "06097" },
      { name: "Stanislaus", fips: "06099" },
      { name: "Sutter", fips: "06101" },
      { name: "Tehama", fips: "06103" },
      { name: "Trinity", fips: "06105" },
      { name: "Tulare", fips: "06107" },
      { name: "Tuolumne", fips: "06109" },
      { name: "Ventura", fips: "06111" },
      { name: "Yolo", fips: "06113" },
      { name: "Yuba", fips: "06115" }
    ]
  }
];

// Helper functions
export const getStateByAbbreviation = (abbreviation: string): State | undefined => {
  return states.find(state => state.abbreviation === abbreviation.toUpperCase());
};

export const getStateByName = (name: string): State | undefined => {
  return states.find(state => 
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
  return states;
};

export const getCountiesForState = (stateName: string): County[] => {
  const state = getStateByName(stateName);
  return state ? state.counties : [];
}; 
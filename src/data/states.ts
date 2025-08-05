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

// All 50 US States
export const states: State[] = [
  { name: "Alabama", abbreviation: "AL", counties: [{ name: "Jefferson", fips: "01073" }] },
  { name: "Alaska", abbreviation: "AK", counties: [{ name: "Anchorage", fips: "02020" }] },
  { name: "Arizona", abbreviation: "AZ", counties: [{ name: "Maricopa", fips: "04013" }] },
  { name: "Arkansas", abbreviation: "AR", counties: [{ name: "Pulaski", fips: "05119" }] },
  { name: "California", abbreviation: "CA", counties: [{ name: "Los Angeles", fips: "06037" }] },
  { name: "Colorado", abbreviation: "CO", counties: [{ name: "Denver", fips: "08031" }] },
  { name: "Connecticut", abbreviation: "CT", counties: [{ name: "Hartford", fips: "09003" }] },
  { name: "Delaware", abbreviation: "DE", counties: [{ name: "New Castle", fips: "10003" }] },
  { name: "Florida", abbreviation: "FL", counties: [{ name: "Miami-Dade", fips: "12086" }] },
  { name: "Georgia", abbreviation: "GA", counties: [{ name: "Fulton", fips: "13121" }] },
  { name: "Hawaii", abbreviation: "HI", counties: [{ name: "Honolulu", fips: "15003" }] },
  { name: "Idaho", abbreviation: "ID", counties: [{ name: "Ada", fips: "16001" }] },
  { name: "Illinois", abbreviation: "IL", counties: [{ name: "Cook", fips: "17031" }] },
  { name: "Indiana", abbreviation: "IN", counties: [{ name: "Marion", fips: "18097" }] },
  { name: "Iowa", abbreviation: "IA", counties: [{ name: "Polk", fips: "19153" }] },
  { name: "Kansas", abbreviation: "KS", counties: [{ name: "Sedgwick", fips: "20173" }] },
  { name: "Kentucky", abbreviation: "KY", counties: [{ name: "Jefferson", fips: "21111" }] },
  { name: "Louisiana", abbreviation: "LA", counties: [{ name: "Orleans", fips: "22071" }] },
  { name: "Maine", abbreviation: "ME", counties: [{ name: "Cumberland", fips: "23005" }] },
  { name: "Maryland", abbreviation: "MD", counties: [{ name: "Baltimore", fips: "24005" }] },
  { name: "Massachusetts", abbreviation: "MA", counties: [{ name: "Suffolk", fips: "25025" }] },
  { name: "Michigan", abbreviation: "MI", counties: [{ name: "Wayne", fips: "26163" }] },
  { name: "Minnesota", abbreviation: "MN", counties: [{ name: "Hennepin", fips: "27053" }] },
  { name: "Mississippi", abbreviation: "MS", counties: [{ name: "Hinds", fips: "28049" }] },
  { name: "Missouri", abbreviation: "MO", counties: [{ name: "St. Louis", fips: "29189" }] },
  { name: "Montana", abbreviation: "MT", counties: [{ name: "Yellowstone", fips: "30111" }] },
  { name: "Nebraska", abbreviation: "NE", counties: [{ name: "Douglas", fips: "31055" }] },
  { name: "Nevada", abbreviation: "NV", counties: [{ name: "Clark", fips: "32003" }] },
  { name: "New Hampshire", abbreviation: "NH", counties: [{ name: "Hillsborough", fips: "33011" }] },
  { name: "New Jersey", abbreviation: "NJ", counties: [{ name: "Essex", fips: "34013" }] },
  { name: "New Mexico", abbreviation: "NM", counties: [{ name: "Bernalillo", fips: "35001" }] },
  { name: "New York", abbreviation: "NY", counties: [{ name: "New York", fips: "36061" }] },
  { name: "North Carolina", abbreviation: "NC", counties: [{ name: "Mecklenburg", fips: "37119" }] },
  { name: "North Dakota", abbreviation: "ND", counties: [{ name: "Cass", fips: "38017" }] },
  { name: "Ohio", abbreviation: "OH", counties: [{ name: "Cuyahoga", fips: "39035" }] },
  { name: "Oklahoma", abbreviation: "OK", counties: [{ name: "Oklahoma", fips: "40109" }] },
  { name: "Oregon", abbreviation: "OR", counties: [{ name: "Multnomah", fips: "41051" }] },
  { name: "Pennsylvania", abbreviation: "PA", counties: [{ name: "Philadelphia", fips: "42101" }] },
  { name: "Rhode Island", abbreviation: "RI", counties: [{ name: "Providence", fips: "44007" }] },
  { name: "South Carolina", abbreviation: "SC", counties: [{ name: "Greenville", fips: "45045" }] },
  { name: "South Dakota", abbreviation: "SD", counties: [{ name: "Minnehaha", fips: "46099" }] },
  { name: "Tennessee", abbreviation: "TN", counties: [{ name: "Davidson", fips: "47037" }] },
  { name: "Texas", abbreviation: "TX", counties: [{ name: "Harris", fips: "48201" }] },
  { name: "Utah", abbreviation: "UT", counties: [{ name: "Salt Lake", fips: "49035" }] },
  { name: "Vermont", abbreviation: "VT", counties: [{ name: "Chittenden", fips: "50007" }] },
  { name: "Virginia", abbreviation: "VA", counties: [{ name: "Fairfax", fips: "51059" }] },
  { name: "Washington", abbreviation: "WA", counties: [{ name: "King", fips: "53033" }] },
  { name: "West Virginia", abbreviation: "WV", counties: [{ name: "Kanawha", fips: "54039" }] },
  { name: "Wisconsin", abbreviation: "WI", counties: [{ name: "Milwaukee", fips: "55079" }] },
  { name: "Wyoming", abbreviation: "WY", counties: [{ name: "Laramie", fips: "56021" }] }
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
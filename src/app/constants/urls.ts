import { environment } from '../../environments/environment';

export const API_ENDPOINTS = {
  locations: 'locations?query=##&results=10',
  journeys:
    'journeys?from=%1&to.id=%2&to.name=%3&to.latitude=%4&to.longitude=%5',
  departures: 'stops/##/departures',
};

export const getAPIURL = () => {
  return environment.apiEndpoint;
};

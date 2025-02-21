import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { PropertyService } from '../../services/property/property.service';
import { Property } from '../../models/single-property-response.model';

export const propertyResolver: ResolveFn<Property | null> = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const propertyId = route.paramMap.get('id');
  if (!propertyId) {
    return null;
  }
  const propertyService = inject(PropertyService);
  const response = await propertyService.getPropertyById(propertyId);
  return response?.data ?? null;
};

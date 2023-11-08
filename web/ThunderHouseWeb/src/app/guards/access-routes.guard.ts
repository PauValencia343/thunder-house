import { CanActivateFn } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';


export const accessRoutesGuard: CanActivateFn = (route, state) => {


  return true;
};



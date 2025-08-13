import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { Contact } from './components/contact/contact';
import { Services } from './components/services/services';
import { PrivacyPolicy } from './components/privacy-policy/privacy-policy';

export const routes: Routes = [
    {path: '',redirectTo: '/home', pathMatch: 'full'}, //rotta default
    {path: 'home', component: Home},
    {path: 'about', component: About},
    {path: 'services', component: Services},
    {path: 'contact', component: Contact},
    {path: 'privacy-policy', component: PrivacyPolicy},
    {path: '**', redirectTo: '/home'} 

];  

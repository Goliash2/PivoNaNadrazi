import {Injectable} from '@nestjs/common';
import {Nadrazka} from './nadrazky.model';

@Injectable()
export class NadrazkyService {
    nadrazky: Nadrazka
}

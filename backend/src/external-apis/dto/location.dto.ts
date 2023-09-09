import {
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  Language,
  LANGUAGES,
} from '../../user-settings/entities/user-settings.entity';
import { ApiProperty } from '@nestjs/swagger';

export const COUNTRY_CODES = [
  'af',
  'al',
  'dz',
  'as',
  'ad',
  'ao',
  'ai',
  'aq',
  'ag',
  'ar',
  'am',
  'aw',
  'au',
  'at',
  'az',
  'bs',
  'bh',
  'bd',
  'bb',
  'by',
  'be',
  'bz',
  'bj',
  'bm',
  'bt',
  'bo',
  'bq',
  'ba',
  'bw',
  'bv',
  'br',
  'io',
  'bn',
  'bg',
  'bf',
  'bi',
  'kh',
  'cm',
  'ca',
  'cv',
  'ky',
  'cf',
  'td',
  'cl',
  'cn',
  'cx',
  'cc',
  'co',
  'km',
  'cg',
  'cd',
  'ck',
  'cr',
  'hr',
  'cu',
  'cw',
  'cy',
  'cz',
  'ci',
  'dk',
  'dj',
  'dm',
  'do',
  'ec',
  'eg',
  'sv',
  'gq',
  'er',
  'ee',
  'et',
  'fk',
  'fo',
  'fj',
  'fi',
  'fr',
  'gf',
  'pf',
  'tf',
  'ga',
  'gm',
  'ge',
  'de',
  'gh',
  'gi',
  'gr',
  'gl',
  'gd',
  'gp',
  'gu',
  'gt',
  'gg',
  'gn',
  'gw',
  'gy',
  'ht',
  'hm',
  'va',
  'hn',
  'hk',
  'hu',
  'is',
  'in',
  'id',
  'ir',
  'iq',
  'ie',
  'im',
  'il',
  'it',
  'jm',
  'jp',
  'je',
  'jo',
  'kz',
  'ke',
  'ki',
  'kp',
  'kr',
  'kw',
  'kg',
  'la',
  'lv',
  'lb',
  'ls',
  'lr',
  'ly',
  'li',
  'lt',
  'lu',
  'mo',
  'mk',
  'mg',
  'mw',
  'my',
  'mv',
  'ml',
  'mt',
  'mh',
  'mq',
  'mr',
  'mu',
  'yt',
  'mx',
  'fm',
  'md',
  'mc',
  'mn',
  'me',
  'ms',
  'ma',
  'mz',
  'mm',
  'na',
  'nr',
  'np',
  'nl',
  'nc',
  'nz',
  'ni',
  'ne',
  'ng',
  'nu',
  'nf',
  'mp',
  'no',
  'om',
  'pk',
  'pw',
  'ps',
  'pa',
  'pg',
  'py',
  'pe',
  'ph',
  'pn',
  'pl',
  'pt',
  'pr',
  'qa',
  'ro',
  'ru',
  'rw',
  're',
  'bl',
  'sh',
  'kn',
  'lc',
  'mf',
  'pm',
  'vc',
  'ws',
  'sm',
  'st',
  'sa',
  'sn',
  'rs',
  'sc',
  'sl',
  'sg',
  'sx',
  'sk',
  'si',
  'sb',
  'so',
  'za',
  'gs',
  'ss',
  'es',
  'lk',
  'sd',
  'sr',
  'sj',
  'sz',
  'se',
  'ch',
  'sy',
  'tw',
  'tj',
  'tz',
  'th',
  'tl',
  'tg',
  'tk',
  'to',
  'tt',
  'tn',
  'tr',
  'tm',
  'tc',
  'tv',
  'ug',
  'ua',
  'ae',
  'gb',
  'us',
  'um',
  'uy',
  'uz',
  'vu',
  've',
  'vn',
  'vg',
  'vi',
  'wf',
  'eh',
  'ye',
  'zm',
  'zw',
  'ax',
] as const;

export const COUNTRY_CODES_UPPER = COUNTRY_CODES.map((code) =>
  code.toUpperCase(),
);

export type CountryCode = (typeof COUNTRY_CODES)[number];
export type CountryCodeUpper = (typeof COUNTRY_CODES_UPPER)[number];

export class CoordinatesLocationDto {
  @ApiProperty({
    description: 'Longitude of the location',
  })
  @IsLongitude()
  longitude: number;

  @ApiProperty({
    description: 'Latitude of the location',
  })
  @IsLatitude()
  latitude: number;
}

export class WeatherDataDto {
  @ApiProperty({
    description: 'Country code of the location',
    enum: COUNTRY_CODES,
  })
  @IsEnum(COUNTRY_CODES)
  country!: CountryCode;

  @ApiProperty({
    description: 'City of the location',
  })
  @IsString()
  @IsNotEmpty()
  city!: string;

  @ApiProperty({
    description: 'Language of the weather data to be returned',
    enum: LANGUAGES,
  })
  @IsEnum(LANGUAGES)
  language!: Language;
}

export class CityLocationDto {
  @ApiProperty({
    description: 'Name of the city',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: 'latitude of the city',
  })
  @IsLatitude()
  lat!: number;

  @ApiProperty({
    description: 'longitude of the city',
  })
  @IsLongitude()
  lon!: number;

  @ApiProperty({
    description: 'Localized names of the city',
    type: Object,
  })
  @IsObject()
  @IsOptional()
  local_names?: Record<string, string>;

  @ApiProperty({
    description: 'Country code (uppercase) of the city',
  })
  @IsEnum(COUNTRY_CODES_UPPER)
  country!: CountryCodeUpper;

  @ApiProperty({
    description: 'Country state of the city',
  })
  @IsString()
  state!: string;
}

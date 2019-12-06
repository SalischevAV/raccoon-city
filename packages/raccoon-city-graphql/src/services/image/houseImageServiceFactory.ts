import * as admin from 'firebase-admin';
import House from '../../db/models/house';
import {LandingImageDbService} from '../../db/services/images/landingImageDbService';
import {VRImageDbService} from '../../db/services/images/VRImageDbService';
import {ImageOperations, ImageType} from './imageService';
import {FirebaseImageUploader} from './imageUploader';
import {LandingImageService} from './landingImage';
import {PhotosService} from './photos';
import {VRImageService} from './vrImage';

export class HouseImageServiceFactory {
    constructor(private mode: ImageType) {}

    public getImageService(firebase: admin.app.App, apartmentComplexId: string, name?: string): ImageOperations {
        if ([ImageType.CHESS_GRID, ImageType.MOBILE, ImageType.SITE].includes(this.mode)) {
            return new LandingImageService(
                new FirebaseImageUploader(firebase, apartmentComplexId),
                new LandingImageDbService(apartmentComplexId, this.mode, House)
            );
        }

        if ([ImageType.HALF_VR, ImageType.VR].includes(this.mode)) {
            return new VRImageService(
                new FirebaseImageUploader(firebase, apartmentComplexId),
                new VRImageDbService(apartmentComplexId, this.mode, name, House)
            );
        }

        if (this.mode === ImageType.PHOTO) {
            return new PhotosService(
                new FirebaseImageUploader(firebase, apartmentComplexId),
                new VRImageDbService(apartmentComplexId, this.mode, name, House)
            );
        }
    }
}

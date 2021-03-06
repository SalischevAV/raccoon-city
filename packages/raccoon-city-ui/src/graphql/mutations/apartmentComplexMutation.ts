import {gql} from 'apollo-boost';

export const CREATE_APARTMENT_COMPLEX = gql`
    mutation createComplex($developerUuid: String!, $apartmentComplex: ApartmentComplexInput!) {
        createApartmentComplex(developerUuid: $developerUuid, apartmentComplex: $apartmentComplex) {
            id
        }
    }
`;

export const DELETE_APARTMENT_COMPLEX = gql`
    mutation deleteApartmentComplex($uuid: String!) {
        deleteApartmentComplex(uuid: $uuid)
    }
`;

export const EDIT_APARTMENT_COMPLEX = gql`
    mutation updateApartmentComplex($uuid: String!, $apartmentComplex: ApartmentComplexInput!) {
        updateApartmentComplex(uuid: $uuid, apartmentComplex: $apartmentComplex) {
            id
        }
    }
`;

export const UPLOAD_FILE = gql`
    mutation addImage($file: Upload!, $mode: String!, $uuid: String!, $name: String) {
        addImage(file: $file, mode: $mode, uuid: $uuid, name: $name) {
            downloadUrl
        }
    }
`;

export const DELETE_IMAGE = gql`
    mutation deleteImage($mode: String!, $uuid: String!, $imageId: String!) {
        deleteImage(mode: $mode, uuid: $uuid, imageId: $imageId)
    }
`;

export const UPLOAD_SPREADSHEET = gql`
    mutation uploadApartmentComplexFile($uuid: String!, $file: Upload!) {
        uploadApartmentComplexFile(uuid: $uuid, file: $file) {
            house
            flats {
                flatNumber
                levelAmount
                price
                level
                section
                area
                status
                roomAmount
                sale
                squarePrice
            }
        }
    }
`;

export const ASSIGN_FLATS = gql`
    mutation assignFlats($data: [HosueWithFlats]) {
        assignFlats(data: $data)
    }
`;

import {CustomField} from '../../core/staff-fields/custom-field.entity';
import {SocialLink} from '../../core/staff-fields/social-link.entity';
import {FieldRepository} from '../../core/staff-fields/field.repository';
import ObjectID from 'bson-objectid';

export class CustomFieldRepositoryInMemory implements FieldRepository {
    private fields: (CustomField | SocialLink)[];
    constructor() {
        this.fields = [
            CustomField.create({
                id: '65ff1e3e8133692792015594',
                name: 'Awesome',
                enabled: false,
                type: 'boolean'
            }),
            CustomField.create({
                id: '65ff32c01ab154c2c69f96b0',
                name: 'Awesome',
                enabled: true,
                type: 'short'
            }),
            SocialLink.create({
                id: '65ff210286b79d4e02a4db20',
                name: 'Twitter',
                enabled: false,
                placeholder: 'https://twitter.com/name',
                icon: 'https://icon.com'
            })
        ];
    }

    async getById(id: ObjectID): Promise<CustomField | SocialLink | null> {
        return this.fields.find(field => field.id.equals(id)) || null;
    }

    async getAll() {
        return this.fields;
    }

    async save(entity: CustomField) {
        if (this.fields.find(existing => existing.id.equals(entity.id))) {
            return;
        }
        this.fields.push(entity);
    }
}

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import usePost from '../hooks/usePost';
import SpecialFeaturesDropDown from './SpecialFeaturesDropDown';
import { Config } from '../Config';
import { useNavigate } from 'react-router-dom';
interface FilmFormValues {
    title: string;
    description: string;
    releaseYear: string;
    languageId: string;
    originalLanguageId: string;
    rentalDuration: string;
    rentalRate: string;
    length: string;
    replacementCost: string;
    rating: string;
    specialFeatures: string[];
    castIds: number[];
}

interface Errors {
    [key: string]: string | undefined;
}

const FilmForm = () => {
    const [formValues, setFormValues] = useState<FilmFormValues>({
        title: '',
        description: '',
        releaseYear: '',
        languageId: '',
        originalLanguageId: '',
        rentalDuration: '',
        rentalRate: '',
        length: '',
        replacementCost: '',
        rating: '',
        specialFeatures: [],
        castIds: []
    });
    const url: string = Config.API_URL + "/films";
    const {status, handlePost} = usePost<FilmFormValues>(url)
    const nav = useNavigate();
    useEffect(() => {
        if (status === 201) {
          alert("Film added successfully");
          nav("/films");
        }
    }, [status, nav]);

    const [errors, setErrors] = useState<Errors>({});
    const [newCastId, setNewCastId] = useState<number | ''>('');
    const validate = (): boolean => {
        const newErrors: Errors = {};
        if (!formValues.title || formValues.title.length < 1 || formValues.title.length > 128) {
            newErrors.title = 'Title must be between 1 and 128 characters';
        }
        if (!formValues.languageId || Number(formValues.languageId) < 1 || Number(formValues.languageId) > 255) {
            newErrors.languageId = 'Language ID must be between 1 and 255';
        }
        if (!formValues.rentalDuration || Number(formValues.rentalDuration) < 0 || Number(formValues.rentalDuration) > 255) {
            newErrors.rentalDuration = 'Rental Duration must be between 0 and 255';
        }
        if (!formValues.rentalRate || Number(formValues.rentalRate) < 0) {
            newErrors.rentalRate = 'Rental Rate must be a positive number';
        }
        if (!formValues.replacementCost || Number(formValues.replacementCost) < 0) {
            newErrors.replacementCost = 'Replacement Cost must be a positive number';
        }
        if (!Array.isArray(formValues.castIds) || !formValues.castIds.every(id => Number.isInteger(id) && id >= 0 && id <= 65535)) {
            newErrors.castIds = 'Cast IDs must be an array of shorts (0 to 65535)';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value});
    };

    const handleRatingChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const {name, value } = e.target
        setFormValues({ ...formValues, [name]: value });
    }

    const toggleSpecialFeature = (feature: string) => {
        setFormValues(prevValues => {
            const updatedSpecialFeatures = prevValues.specialFeatures.includes(feature)
                ? prevValues.specialFeatures.filter(f => f !== feature)
                : [...prevValues.specialFeatures, feature];
            return { ...prevValues, specialFeatures: updatedSpecialFeatures };
        });
    };
    
    const handleNewCastIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setNewCastId(isNaN(value) ? '' : value);
    };
    
    const addCastId = () => {
        if (newCastId !== "" && Number.isInteger(newCastId) && newCastId >= 0) {
            setFormValues({ ...formValues, castIds: [...formValues.castIds, newCastId] });
            setNewCastId(''); 
        } else {
            // Optionally, you could set an error or alert the user here
            alert('Please enter a valid positive integer for Cast ID.');
        }
    };
    
    const removeCastId = (index: number) => {
        const newCastIds = formValues.castIds.filter((_, i) => i !== index);
        setFormValues({ ...formValues, castIds: newCastIds });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log(formValues);
            handlePost(formValues);
            
        }
    };

    return (
        <article className="coolBoxGreen wideFixedBox">
            <h2>Submit new Film?</h2>
            <form onSubmit={handleSubmit}>
                <section>
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        data-cy="title"
                        value={formValues.title}
                        onChange={handleChange}
                    />
                    {errors.title && <p>{errors.title}</p>}
                </section>

                <section>
                    <label>Description</label>
                    <input
                        type="text"
                        data-cy="description"
                        name="description"
                        value={formValues.description}
                        onChange={handleChange}
                    />
                </section>

                <section>
                    <label>Release Year</label>
                    <input
                        type="number"
                        data-cy="releaseYear"
                        name="releaseYear"
                        value={formValues.releaseYear}
                        onChange={handleChange}
                    />
                </section>

                <section>
                    <label>Language ID</label>
                    <input
                        type="number"
                        data-cy="languageId"
                        name="languageId"
                        value={formValues.languageId}
                        onChange={handleChange}
                        min={0}
                    />
                    {errors.languageId && <p>{errors.languageId}</p>}
                </section>

                <section>
                    <label>Original Language ID</label>
                    <input
                        type="number"
                        data-cy="originalLanguageId"
                        name="originalLanguageId"
                        value={formValues.originalLanguageId}
                        onChange={handleChange}
                        min={0}
                    />
                </section>
                

                <section>
                    <label>Rental Duration</label>
                    <input
                        type="number"
                        data-cy="rentalDuration"
                        name="rentalDuration"
                        value={formValues.rentalDuration}
                        onChange={handleChange}
                        min={0}
                    />
                    {errors.rentalDuration && <p>{errors.rentalDuration}</p>}
                </section>

                <section>
                    <label>Rental Rate</label>
                    <input
                        type="number"
                        data-cy="rentalRate"
                        name="rentalRate"
                        value={formValues.rentalRate}
                        onChange={handleChange}
                        min={0}
                    />
                    {errors.rentalRate && <p>{errors.rentalRate}</p>}
                </section>

                <section>
                    <label>Length</label>
                    <input
                        type="number"
                        data-cy="length"
                        name="length"
                        value={formValues.length}
                        onChange={handleChange}
                        min={0}
                    />
                </section>

                <section>
                    <label>Replacement Cost</label>
                    <input
                        type="number"
                        data-cy="replacementCost"
                        name="replacementCost"
                        value={formValues.replacementCost}
                        onChange={handleChange}
                        min={0}
                    />
                    {errors.replacementCost && <p>{errors.replacementCost}</p>}
                </section>

                <section>
                    <label>Rating</label>
                    <select
                        name="rating"
                        data-cy="rating"
                        value={formValues.rating}
                        onChange={handleRatingChange}
                        >
                        <option value="G">G</option>
                        <option value="PG">PG</option>
                        <option value="PG_13">PG-13</option>
                        <option value="R">R</option>
                        <option value="NC_17">NC-17</option>
                    </select>
                </section>

                <section>
                    <label>Special Features</label>
                    <SpecialFeaturesDropDown
                        data-cy="specialFeaturesDropDown"
                        selectedFeatures={formValues.specialFeatures}
                        onToggleFeature={toggleSpecialFeature}
                    />
                </section>

                <section>
                    <label>Cast IDs</label>
                    <div>
                        {formValues.castIds.map((id, index) => (
                            <div key={index}>
                                {id}
                                <button type="button" onClick={() => removeCastId(index)}>Remove</button>
                            </div>
                        ))}
                    </div>
                    <input
                        type="number"
                        name="newCastId"
                        value={newCastId}
                        data-cy="newCastId"
                        min={0}
                        onChange={handleNewCastIdChange}
                        
                    />
                    <button type="button" onClick={addCastId} data-cy="addCastId">Add Cast ID</button>
                    {errors.castIds && <p>{errors.castIds}</p>}
                </section>

                <button type="submit" data-cy="submit">Submit</button>
            </form>
        </article>
    );
};

export default FilmForm;
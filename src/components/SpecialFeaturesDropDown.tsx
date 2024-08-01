interface sfDropDownProps {
    selectedFeatures: string[];
    onToggleFeature: (feature: string) => void;
}
const SPECIAL_FEATURE_OPTIONS = ["TRAILERS", "COMMENTARIES", "DELETED_SCENES", "BEHIND_THE_SCENES"];

const SpecialFeaturesDropDown = ({ selectedFeatures, onToggleFeature }: sfDropDownProps) => {

    const handleFeatureToggle = (feature: string) => {
        onToggleFeature(feature);
    };

    return (
        <section className="specialFeatures">
            {SPECIAL_FEATURE_OPTIONS.map(feature => (
                <label key={feature}>
                    <input
                        type="checkbox"
                        checked={selectedFeatures.includes(feature)}
                        onChange={() => handleFeatureToggle(feature)}
                    />
                    {feature}
                </label>
            ))}
        </section>
    );
};

export default SpecialFeaturesDropDown;
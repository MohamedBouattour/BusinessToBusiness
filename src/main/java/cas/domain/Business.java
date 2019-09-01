package cas.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Business.
 */
@Entity
@Table(name = "business")
public class Business implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "raison_sociale", nullable = false)
    private String raisonSociale;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @NotNull
    @Column(name = "prenom", nullable = false)
    private String prenom;

    @NotNull
    @Column(name = "matricule_fiscale", nullable = false)
    private String matriculeFiscale;

    @NotNull
    @Column(name = "adresse", nullable = false)
    private String adresse;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @NotNull
    @Column(name = "siteweb", nullable = false)
    private String siteweb;

    @NotNull
    @Column(name = "cp", nullable = false)
    private Long cp;

    @Column(name = "telecom")
    private Long telecom;

    @Column(name = "ooredoo")
    private Long ooredoo;

    @Column(name = "orange")
    private Long orange;

    @Column(name = "fixe")
    private Long fixe;

    @Column(name = "fixe_2")
    private Long fixe2;

    @Column(name = "fax")
    private Long fax;

    @Column(name = "motivation")
    private Integer motivation;

    @NotNull
    @Column(name = "is_local", nullable = false)
    private Boolean isLocal;

    @ManyToOne
    @JsonIgnoreProperties("businesses")
    private Subsector subsector;

    @ManyToOne
    @JsonIgnoreProperties("businesses")
    private Region region;

    @OneToMany(mappedBy = "business")
    private Set<Productionstep> productionsteps = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRaisonSociale() {
        return raisonSociale;
    }

    public Business raisonSociale(String raisonSociale) {
        this.raisonSociale = raisonSociale;
        return this;
    }

    public void setRaisonSociale(String raisonSociale) {
        this.raisonSociale = raisonSociale;
    }

    public String getNom() {
        return nom;
    }

    public Business nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public Business prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getMatriculeFiscale() {
        return matriculeFiscale;
    }

    public Business matriculeFiscale(String matriculeFiscale) {
        this.matriculeFiscale = matriculeFiscale;
        return this;
    }

    public void setMatriculeFiscale(String matriculeFiscale) {
        this.matriculeFiscale = matriculeFiscale;
    }

    public String getAdresse() {
        return adresse;
    }

    public Business adresse(String adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getEmail() {
        return email;
    }

    public Business email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSiteweb() {
        return siteweb;
    }

    public Business siteweb(String siteweb) {
        this.siteweb = siteweb;
        return this;
    }

    public void setSiteweb(String siteweb) {
        this.siteweb = siteweb;
    }

    public Long getCp() {
        return cp;
    }

    public Business cp(Long cp) {
        this.cp = cp;
        return this;
    }

    public void setCp(Long cp) {
        this.cp = cp;
    }

    public Long getTelecom() {
        return telecom;
    }

    public Business telecom(Long telecom) {
        this.telecom = telecom;
        return this;
    }

    public void setTelecom(Long telecom) {
        this.telecom = telecom;
    }

    public Long getOoredoo() {
        return ooredoo;
    }

    public Business ooredoo(Long ooredoo) {
        this.ooredoo = ooredoo;
        return this;
    }

    public void setOoredoo(Long ooredoo) {
        this.ooredoo = ooredoo;
    }

    public Long getOrange() {
        return orange;
    }

    public Business orange(Long orange) {
        this.orange = orange;
        return this;
    }

    public void setOrange(Long orange) {
        this.orange = orange;
    }

    public Long getFixe() {
        return fixe;
    }

    public Business fixe(Long fixe) {
        this.fixe = fixe;
        return this;
    }

    public void setFixe(Long fixe) {
        this.fixe = fixe;
    }

    public Long getFixe2() {
        return fixe2;
    }

    public Business fixe2(Long fixe2) {
        this.fixe2 = fixe2;
        return this;
    }

    public void setFixe2(Long fixe2) {
        this.fixe2 = fixe2;
    }

    public Long getFax() {
        return fax;
    }

    public Business fax(Long fax) {
        this.fax = fax;
        return this;
    }

    public void setFax(Long fax) {
        this.fax = fax;
    }

    public Integer getMotivation() {
        return motivation;
    }

    public Business motivation(Integer motivation) {
        this.motivation = motivation;
        return this;
    }

    public void setMotivation(Integer motivation) {
        this.motivation = motivation;
    }

    public Boolean isIsLocal() {
        return isLocal;
    }

    public Business isLocal(Boolean isLocal) {
        this.isLocal = isLocal;
        return this;
    }

    public void setIsLocal(Boolean isLocal) {
        this.isLocal = isLocal;
    }

    public Subsector getSubsector() {
        return subsector;
    }

    public Business subsector(Subsector subsector) {
        this.subsector = subsector;
        return this;
    }

    public void setSubsector(Subsector subsector) {
        this.subsector = subsector;
    }

    public Region getRegion() {
        return region;
    }

    public Business region(Region region) {
        this.region = region;
        return this;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    public Set<Productionstep> getProductionsteps() {
        return productionsteps;
    }

    public Business productionsteps(Set<Productionstep> productionsteps) {
        this.productionsteps = productionsteps;
        return this;
    }

    public Business addProductionstep(Productionstep productionstep) {
        this.productionsteps.add(productionstep);
        productionstep.setBusiness(this);
        return this;
    }

    public Business removeProductionstep(Productionstep productionstep) {
        this.productionsteps.remove(productionstep);
        productionstep.setBusiness(null);
        return this;
    }

    public void setProductionsteps(Set<Productionstep> productionsteps) {
        this.productionsteps = productionsteps;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Business)) {
            return false;
        }
        return id != null && id.equals(((Business) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Business{" +
            "id=" + getId() +
            ", raisonSociale='" + getRaisonSociale() + "'" +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", matriculeFiscale='" + getMatriculeFiscale() + "'" +
            ", adresse='" + getAdresse() + "'" +
            ", email='" + getEmail() + "'" +
            ", siteweb='" + getSiteweb() + "'" +
            ", cp=" + getCp() +
            ", telecom=" + getTelecom() +
            ", ooredoo=" + getOoredoo() +
            ", orange=" + getOrange() +
            ", fixe=" + getFixe() +
            ", fixe2=" + getFixe2() +
            ", fax=" + getFax() +
            ", motivation=" + getMotivation() +
            ", isLocal='" + isIsLocal() + "'" +
            "}";
    }
}

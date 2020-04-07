<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\EstudianteRepository")
 */
class Estudiante
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     */
    private $codigo;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     */
    private $nombre;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $programa;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $tipodoc;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     */
    private $documento;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $estado;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Trabajo", mappedBy="estudiante")
     */
    private $trabajos;

    
    public function __construct()
    {
        $this->trabajos = new ArrayCollection();
    }

    /**
     * @return Collection|Trabajo[]
     */
    public function getTrabajos(): Collection
    {
        return $this->trabajos;
    }

    public function addTrabajo(Trabajo $trabajo): self
    {
        if (!$this->trabajos->contains($trabajo)) {
            $this->trabajos[] = $trabajo;
            $trabajo->setEstudiante($this);
        }

        return $this;
    }

    public function removeTrabajo(Trabajo $trabajo): self
    {
        if ($this->trabajos->contains($trabajo)) {
            $this->trabajos->removeElement($trabajo);
            // set the owning side to null (unless already changed)
            if ($trabajo->getEstudiante() === $this) {
                $trabajo->setEstudiante(null);
            }
        }

        return $this;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCodigo(): ?string
    {
        return $this->codigo;
    }

    public function setCodigo(string $codigo): self
    {
        $this->codigo = $codigo;

        return $this;
    }

    public function getNombre(): ?string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre): self
    {
        $this->nombre = $nombre;

        return $this;
    }

    public function getPrograma(): ?string
    {
        return $this->programa;
    }

    public function setPrograma(string $programa): self
    {
        $this->programa = $programa;

        return $this;
    }

    public function getTipodoc(): ?string
    {
        return $this->tipodoc;
    }

    public function setTipodoc(string $tipodoc): self
    {
        $this->tipodoc = $tipodoc;

        return $this;
    }

    public function getDocumento(): ?string
    {
        return $this->documento;
    }

    public function setDocumento(string $documento): self
    {
        $this->documento = $documento;

        return $this;
    }

    public function getEstado(): ?string
    {
        return $this->estado;
    }

    public function setEstado(string $estado): self
    {
        $this->estado = $estado;

        return $this;
    }

    

    public function toArray(){
        return ['id' => $this->id,'codigo' => $this->codigo, 'nombre' => $this->nombre, 'programa' => $this->programa];
    }
    
}

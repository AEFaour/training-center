<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\InvoiceRepository")
 * @ApiResource(
 *     subresourceOperations={
 *          "api_trainees_invoices_get_subresource"={
 *              "normalization_context"={"groups"={"invoices_subresource"}}
 *          }
 *     },
 *     itemOperations={"GET", "PUT", "DELETE", "increment"={
 *     "method"="post",
 *      "path"="/invoices/{id}/increment",
 *      "controller"="App\Controller\InvoiceIncrementationController",
 *      "swagger_context"={
 *            "summary"="Increment a Invoice",
 *             "description"="Increment the chrono of the invoice"
 *      }}},
 *  attributes={
 *       "pagination_enabled"=true,
 *       "pagination_items_per_page": 20,
 *       "order":{"sentAt":"desc"}
 *     },
 *     normalizationContext={"groups"= {"invoices_read"}},
 *     denormalizationContext={"disable_type_enforcement"=true}
 * )
 * @ApiFilter(OrderFilter::class, properties={"amount", "sentAt"})
 */
class Invoice
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"invoices_read", "trainees_read", "invoices_subresource"})
     */
    private $id;

    /**
     * @ORM\Column(type="float")
     * @Groups({"invoices_read", "trainees_read", "invoices_subresource"})
     * @Assert\NotBlank(message="Il est impératif d'intégrer le montant de la facture! ")
     * @Assert\Type(type="numeric", message="Il est impératif que le montant de la facture soit numérique! " )
     */
    private $amount;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"invoices_read", "trainees_read", "invoices_subresource"})
     * @Assert\NotBlank(message="Il est impératif d'intégrer la date de la facture ")
     */
    private $sentAt;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"invoices_read", "trainees_read", "invoices_subresource"})
     * @Assert\NotBlank(message="Il est impératif de préciser le status de la facture! ")
     * @Assert\Choice(choices={"SENT", "PAID", "CANCELLED"},
     *     message="Il est impératif de choisir un status de la facture parmi les options suivants : SENT, PAID et CANCELLED! ")
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Trainee", inversedBy="invoices")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"invoices_read"})
     * @Assert\NotBlank(message="Il est impératif d'indiquer le stagiaire concerné par la facture ")
     */
    private $trainee;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"invoices_read", "trainees_read", "invoices_subresource"})
     * @Assert\NotBlank(message="Il est impératif d'intégrer le chrono de la facture ")
     * @Assert\Type(type="integer", message="Il est impératif que le chrono de la facture soit un nombre! " )
     */
    private $chrono;

    /**
     * @Groups({"invoices_read", "invoices_subresource"})
     * @return User
     */
    public function getUser(): User
    {
        return $this->trainee->getUser();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount($amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getSentAt(): ?\DateTimeInterface
    {
        return $this->sentAt;
    }

    public function setSentAt($sentAt): self
    {
        $this->sentAt = $sentAt;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getTrainee(): ?Trainee
    {
        return $this->trainee;
    }

    public function setTrainee(?Trainee $trainee): self
    {
        $this->trainee = $trainee;

        return $this;
    }

    public function getChrono(): ?int
    {
        return $this->chrono;
    }

    public function setChrono($chrono): self
    {
        $this->chrono = $chrono;

        return $this;
    }
}

<?php

namespace App\Controller;

use App\Entity\Invoice;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class InvoiceIncrementationController extends AbstractController
{
    /**
     * @var EntityManagerInterface
     */
    private $manager;

    /**
     * InvoiceIncrementationController constructor.
     * @param $manager
     */
    public function __construct(EntityManagerInterface $manager)
    {
        $this->manager = $manager;
    }

    /**
     * @Route("/invoice/incrementation", name="invoice_incrementation")
     */
    public function index()
    {
        return $this->render('invoice_incrementation/index.html.twig', [
            'controller_name' => 'InvoiceIncrementationController',
        ]);
    }

    /**
     * @param Invoice $data
     * @return Invoice
     */
    public function __invoke(Invoice $data){

        $data->setChrono($data->getChrono() + 1);
        $this->manager->flush();
        dd($data);
        return $data;
    }
}

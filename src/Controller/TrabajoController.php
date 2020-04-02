<?php

namespace App\Controller;

use App\Entity\Trabajo;
use App\Form\TrabajoType;
use App\Repository\TrabajoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/trabajo", name="api_trabajo")
 */
class TrabajoController extends AbstractController
{
    private $entityManager;
    private $trabajoRepository;
 
    public function __construct(EntityManagerInterface $entityManager, TrabajoRepository $trabajoRepository)
    {
        $this->entityManager = $entityManager;
        $this->trabajoRepository = $trabajoRepository;
    }
    
     /**
     * @Route("/read", name="trabajo")
     */
    public function index()
    {
        $trabajos = $this->trabajoRepository->findAll();
        $arrayOfTrabajos = [];
        foreach ($trabajos as $trabajo){
            $arrayOfTrabajos[] = $trabajo->toArray();
        }
        return $this->json($arrayOfTrabajos);
    }





    
    /**
     * @Route("/new", name="trabajo_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $trabajo = new Trabajo();
        $form = $this->createForm(TrabajoType::class, $trabajo);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($trabajo);
            $entityManager->flush();

            return $this->redirectToRoute('trabajo_index');
        }

        return $this->render('trabajo/new.html.twig', [
            'trabajo' => $trabajo,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="trabajo_show", methods={"GET"})
     */
    public function show(Trabajo $trabajo): Response
    {
        return $this->render('trabajo/show.html.twig', [
            'trabajo' => $trabajo,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="trabajo_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, Trabajo $trabajo): Response
    {
        $form = $this->createForm(TrabajoType::class, $trabajo);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('trabajo_index');
        }

        return $this->render('trabajo/edit.html.twig', [
            'trabajo' => $trabajo,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="trabajo_delete", methods={"DELETE"})
     */
    public function delete(Request $request, Trabajo $trabajo): Response
    {
        if ($this->isCsrfTokenValid('delete'.$trabajo->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($trabajo);
            $entityManager->flush();
        }

        return $this->redirectToRoute('trabajo_index');
    }
}
